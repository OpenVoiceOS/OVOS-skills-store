#!/usr/bin/env python3
"""
Validate skill entries in raw_jsons/ that a pull request adds or changes.

Usage: python scripts/validate_raw_jsons.py [raw_jsons/<file>.json ...]

Each named entry must:
  - parse as JSON
  - pass validate_submission from apply_submission.py, the same check a
    submission issue gets
  - have the file name that apply_submission.py writes for its skill_id
  - have a skill_id that no other file in raw_jsons/ uses

Only the named files are checked. Entries already on the default branch were
written before this validator existed, and most of them do not pass it.
Exit code 1 when any named entry fails, 0 otherwise.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from apply_submission import validate_submission  # noqa: E402

RAW_JSONS = Path(__file__).parent.parent / 'raw_jsons'


def expected_filename(skill_id: str) -> str:
    """The file name apply_submission.py writes for a skill_id."""
    return skill_id.strip().lower().replace('.', '-') + '.json'


def skill_ids_elsewhere(exclude: Path) -> dict:
    """skill_id -> file name, for every other parsable entry in raw_jsons/."""
    ids = {}
    for path in sorted(RAW_JSONS.glob('*.json')):
        if path.resolve() == exclude.resolve():
            continue
        try:
            skill_id = json.loads(path.read_text()).get('skill_id')
        except (json.JSONDecodeError, OSError, AttributeError):
            continue
        if isinstance(skill_id, str):
            ids[skill_id.strip().lower()] = path.name
    return ids


def check_entry(path: Path) -> list:
    """Error messages for one entry; empty when it passes."""
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError as e:
        return [f"invalid JSON: {e}"]
    if not isinstance(data, dict):
        return ["the entry must be a JSON object"]

    errors = validate_submission(data)

    skill_id = data.get('skill_id')
    if isinstance(skill_id, str) and skill_id.strip():
        want = expected_filename(skill_id)
        if path.name != want:
            errors.append(f"file name must be {want} for skill_id {skill_id}")
        other = skill_ids_elsewhere(path).get(skill_id.strip().lower())
        if other:
            errors.append(f"skill_id {skill_id} is already used by raw_jsons/{other}")
    return errors


def main(argv: list) -> int:
    paths = [Path(a) for a in argv if a.strip()]
    if not paths:
        print("No raw_jsons entry was added or changed. Nothing to validate.")
        return 0

    failed = 0
    for path in paths:
        if not path.exists():
            print(f"::error file={path}::file not found")
            failed += 1
            continue
        errors = check_entry(path)
        if errors:
            failed += 1
            for error in errors:
                print(f"::error file={path}::{error}")
        else:
            print(f"ok: {path}")

    print(f"{len(paths) - failed} of {len(paths)} entries pass.")
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
