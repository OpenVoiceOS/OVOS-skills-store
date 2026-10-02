#!/usr/bin/env python3
"""Validate EVERY entry in raw_jsons/, not only the ones a pull request changed.

`validate_raw_jsons.py` checks the files a pull request touches. That leaves the
committed corpus unchecked, and it was: before this script existed all 36
entries failed `validate_submission`, and nothing said so. Most of those
failures were the validator's own fault (it demanded a URL in `icon`, while the
store renders `icon` as a react-icons component name), and the rest were real
gaps nobody could see behind them.

This script closes that. It runs the same validator over the whole directory, so
a rule that contradicts the corpus, or an entry that drifts from the rules, is
one command away from being visible.

KNOWN_FAILURES is the one exemption, and it is asserted to be accurate: an entry
that starts passing must leave the list, and an entry that starts failing cannot
hide in it. Exit code 1 on any unexpected failure, and also when the exemption
list is stale.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from apply_submission import validate_submission  # noqa: E402

RAW_JSONS = Path(__file__).parent.parent / 'raw_jsons'

# skill-homeassistant.json ships no `examples`. It is a third-party skill
# (neon_homeassistant_skill.mikejgray), so the voice phrasings have to come from
# its maintainer rather than be invented here. Everything else validates.
KNOWN_FAILURES = {
    'skill-homeassistant.json': ['examples must be a list with at least 1 voice command'],
}


def main() -> int:
    actual = {}
    for path in sorted(RAW_JSONS.glob('*.json')):
        try:
            data = json.loads(path.read_text(encoding='utf-8'))
        except json.JSONDecodeError as exc:
            actual[path.name] = [f'invalid JSON: {exc}']
            continue
        errors = validate_submission(data)
        if errors:
            actual[path.name] = errors

    status = 0
    for name, errors in sorted(actual.items()):
        if KNOWN_FAILURES.get(name) == errors:
            continue
        status = 1
        if name in KNOWN_FAILURES:
            print(f'{name}: failures changed')
            print(f'  expected: {KNOWN_FAILURES[name]}')
            print(f'  actual:   {errors}')
        else:
            print(f'{name}: {errors}')

    for name in sorted(set(KNOWN_FAILURES) - set(actual)):
        status = 1
        print(f'{name}: now passes; remove it from KNOWN_FAILURES')

    total = len(list(RAW_JSONS.glob('*.json')))
    print(f'{total} entries checked, {len(actual)} failing, '
          f'{len(KNOWN_FAILURES)} exempt')
    return status


if __name__ == '__main__':
    sys.exit(main())
