#!/usr/bin/env python3
"""
Apply a skill submission from JSON file to raw_jsons/ directory.

Usage:
    python scripts/apply_submission.py /path/to/submission.json

Validates the submission and writes it to raw_jsons/{skill_id}.json
"""

import json
import re
import sys
from pathlib import Path
from typing import Any, Optional
from urllib.parse import urlparse


class ValidationError(Exception):
    """Raised when submission validation fails."""
    pass


# Required fields with their validators
REQUIRED_FIELDS = {
    'skill_id': {
        'type': str,
        'pattern': r'^[a-z0-9-]+\.[a-z0-9.-]+$',
        'message': 'skill_id must be lowercase with format: skill-name.domain',
    },
    'source': {
        'type': str,
        'validator': lambda x: urlparse(x).netloc == 'github.com',
        'message': 'source must be a valid GitHub URL',
    },
    'package_name': {
        'type': str,
        'pattern': r'^[a-z][a-z0-9-]*$',
        'message': 'package_name must be lowercase, starting with a letter',
    },
    'name': {
        'type': str,
        'min_length': 3,
        'max_length': 100,
        'message': 'name must be 3-100 characters',
    },
    'description': {
        'type': str,
        'min_length': 10,
        'max_length': 500,
        'message': 'description must be 10-500 characters',
    },
    'examples': {
        'type': list,
        'min_items': 1,
        'item_type': str,
        'message': 'examples must be a list with at least 1 voice command',
    },
    'tags': {
        'type': list,
        'min_items': 1,
        'item_type': str,
        'message': 'tags must be a list with at least 1 tag',
    },
}

# Optional fields with their types
OPTIONAL_FIELDS = {
    'icon': str,
    'images': list,
    'license': str,
    'extra_plugins': dict,
    'author': str,
    'version': str,
}

# Allowed licenses
ALLOWED_LICENSES = [
    'apache-2.0', 'mit', 'gpl-3.0', 'gpl-2.0', 'lgpl-3.0',
    'bsd-3-clause', 'bsd-2-clause', 'mpl-2.0', 'unlicense',
    'isc', 'artistic-2.0', 'cc0-1.0',
]


def validate_field(name: str, value: Any, config: dict) -> Optional[str]:
    """Validate a single field against its configuration."""
    if value is None:
        return f"{name} is required"

    # Type check
    if not isinstance(value, config['type']):
        return f"{name} must be of type {config['type'].__name__}"

    # Pattern check
    if 'pattern' in config and isinstance(value, str):
        if not re.match(config['pattern'], value):
            return config.get('message', f"{name} has invalid format")

    # Custom validator
    if 'validator' in config:
        if not config['validator'](value):
            return config.get('message', f"{name} validation failed")

    # Length checks for strings
    if isinstance(value, str):
        if 'min_length' in config and len(value) < config['min_length']:
            return config.get('message', f"{name} is too short")
        if 'max_length' in config and len(value) > config['max_length']:
            return config.get('message', f"{name} is too long")

    # List checks
    if isinstance(value, list):
        if 'min_items' in config and len(value) < config['min_items']:
            return config.get('message', f"{name} needs at least {config['min_items']} items")
        if 'item_type' in config:
            for i, item in enumerate(value):
                if not isinstance(item, config['item_type']):
                    return f"{name}[{i}] must be of type {config['item_type'].__name__}"

    return None


def validate_submission(data: dict) -> list:
    """Validate a skill submission. Returns list of error messages."""
    errors = []

    # Check required fields
    for field, config in REQUIRED_FIELDS.items():
        error = validate_field(field, data.get(field), config)
        if error:
            errors.append(error)

    # Validate optional fields if present
    for field, expected_type in OPTIONAL_FIELDS.items():
        if field in data and data[field] is not None:
            if not isinstance(data[field], expected_type):
                errors.append(f"{field} must be of type {expected_type.__name__}")

    # Validate license if present
    if 'license' in data and data['license']:
        if data['license'].lower() not in ALLOWED_LICENSES:
            errors.append(f"license must be one of: {', '.join(ALLOWED_LICENSES)}")

    # Validate icon URL if present
    if 'icon' in data and data['icon']:
        try:
            result = urlparse(data['icon'])
            if not all([result.scheme, result.netloc]):
                errors.append("icon must be a valid URL")
        except Exception:
            errors.append("icon must be a valid URL")

    # Validate images URLs if present
    if 'images' in data and data['images']:
        for i, img in enumerate(data['images']):
            try:
                result = urlparse(img)
                if not all([result.scheme, result.netloc]):
                    errors.append(f"images[{i}] must be a valid URL")
            except Exception:
                errors.append(f"images[{i}] must be a valid URL")

    return errors


def sanitize_submission(data: dict) -> dict:
    """Sanitize and normalize submission data."""
    sanitized = {}

    # Required fields - ensure they're present and cleaned
    sanitized['skill_id'] = data['skill_id'].strip().lower()
    sanitized['source'] = data['source'].strip()
    sanitized['package_name'] = data['package_name'].strip().lower()
    sanitized['name'] = data['name'].strip()
    sanitized['description'] = data['description'].strip()
    sanitized['examples'] = [ex.strip() for ex in data['examples'] if ex.strip()]
    sanitized['tags'] = [tag.strip() for tag in data['tags'] if tag.strip()]

    # Optional fields - only include if present and non-empty
    if data.get('icon'):
        sanitized['icon'] = data['icon'].strip()

    if data.get('images'):
        sanitized['images'] = [img.strip() for img in data['images'] if img.strip()]
    else:
        sanitized['images'] = []

    if data.get('license'):
        sanitized['license'] = data['license'].strip().lower()

    if data.get('extra_plugins'):
        sanitized['extra_plugins'] = data['extra_plugins']
    else:
        sanitized['extra_plugins'] = {}

    if data.get('author'):
        sanitized['author'] = data['author'].strip()

    if data.get('version'):
        sanitized['version'] = data['version'].strip()

    return sanitized


def apply_submission(json_path: str) -> None:
    """Load, validate, and write a skill submission."""
    # Determine paths
    script_dir = Path(__file__).parent
    root_dir = script_dir.parent
    raw_jsons_dir = root_dir / 'raw_jsons'

    # Load submission
    json_path = Path(json_path)
    if not json_path.exists():
        raise ValidationError(f"Submission file not found: {json_path}")

    with open(json_path) as f:
        data = json.load(f)

    # Validate
    errors = validate_submission(data)
    if errors:
        error_msg = "Validation failed:\n" + "\n".join(f"  - {e}" for e in errors)
        raise ValidationError(error_msg)

    # Sanitize
    sanitized = sanitize_submission(data)

    # Generate output filename from skill_id
    filename = sanitized['skill_id'].replace('.', '-') + '.json'
    output_file = raw_jsons_dir / filename

    # Check for duplicate skill_id
    if output_file.exists():
        raise ValidationError(f"Skill already exists: {sanitized['skill_id']}")

    # Write to raw_jsons
    raw_jsons_dir.mkdir(exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(sanitized, f, indent=2)

    print(f"Successfully created: {output_file}")


def main():
    if len(sys.argv) != 2:
        print("Usage: python apply_submission.py <submission.json>")
        sys.exit(1)

    try:
        apply_submission(sys.argv[1])
    except ValidationError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
