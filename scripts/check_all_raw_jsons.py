#!/usr/bin/env python3
"""Validate EVERY entry in raw_jsons/, not only the ones a pull request changed.

`validate_raw_jsons.py` checks the files a pull request touches, through
`check_entry`, which adds two rules over `validate_submission`: the file name
must match the one `apply_submission.py` derives from `skill_id`, and no two
entries may share a `skill_id`. This script runs that same `check_entry` over
the whole directory, so a rule that contradicts the corpus, or an entry that
drifts from the rules, is one command away from being visible.

KNOWN_FAILURES is the one exemption, and it is asserted to be accurate: an entry
that starts passing must leave the list, and an entry that starts failing cannot
hide in it. Exit code 1 on any unexpected failure, and also when the exemption
list is stale.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from validate_raw_jsons import check_entry  # noqa: E402

RAW_JSONS = Path(__file__).parent.parent / 'raw_jsons'

# skill-homeassistant.json ships no `examples`. It is a third-party skill
# (neon_homeassistant_skill.mikejgray), so the voice phrasings have to come from
# its maintainer rather than be invented here.
#
# Every other entry here fails only the file-name rule: its file carries the
# name the submission issue gave it, not the name `apply_submission.py`
# derives from `skill_id`. Renaming them is tracked separately; this list is
# the debt, not a decision to keep it.
KNOWN_FAILURES = {
    'ovos-skill-date-time.json': ['file name must be skill-ovos-date-time-openvoiceos.json for skill_id skill-ovos-date-time.openvoiceos'],
    'skill-alerts.json': ['file name must be skill-ovos-alerts-openvoiceos.json for skill_id skill-ovos-alerts.openvoiceos'],
    'skill-application-launcher.json': ['file name must be skill-ovos-application-launcher-openvoiceos.json for skill_id skill-ovos-application-launcher.openvoiceos'],
    'skill-bandcamp.json': ['file name must be skill-ovos-bandcamp-openvoiceos.json for skill_id skill-ovos-bandcamp.openvoiceos'],
    'skill-dadjokes.json': ['file name must be skill-ovos-icanhazdadjokes-openvoiceos.json for skill_id skill-ovos-icanhazdadjokes.openvoiceos'],
    'skill-ddg.json': ['file name must be skill-ovos-ddg-openvoiceos.json for skill_id skill-ovos-ddg.openvoiceos'],
    'skill-dictation.json': ['file name must be skill-ovos-dictation-openvoiceos.json for skill_id skill-ovos-dictation.openvoiceos'],
    'skill-fallback-chatgpt.json': ['file name must be skill-ovos-fallback-chatgpt-openvoiceos.json for skill_id skill-ovos-fallback-chatgpt.openvoiceos'],
    'skill-fallback-unknown.json': ['file name must be ovos-skill-fallback-unknown-openvoiceos.json for skill_id ovos-skill-fallback-unknown.openvoiceos'],
    'skill-finished-booting.json': ['file name must be skill-ovos-boot-finished-openvoiceos.json for skill_id skill-ovos-boot-finished.openvoiceos'],
    'skill-ggwave.json': ['file name must be ovos-skill-ggwave-openvoiceos.json for skill_id ovos-skill-ggwave.openvoiceos'],
    'skill-homeassistant.json': ['examples must be a list with at least 1 voice command', 'file name must be neon_homeassistant_skill-mikejgray.json for skill_id neon_homeassistant_skill.mikejgray'],
    'skill-ip.json': ['file name must be skill-ovos-ip-openvoiceos.json for skill_id skill-ovos-ip.openvoiceos'],
    'skill-laugh.json': ['file name must be ovos-skill-laugh-openvoiceos.json for skill_id ovos-skill-laugh.openvoiceos'],
    'skill-local-media.json': ['file name must be ovos-skill-local-media-openvoiceos.json for skill_id ovos-skill-local-media.openvoiceos'],
    'skill-meal-plan.json': ['file name must be skill-meal-plan-mikejgray.json for skill_id skill-meal-plan.mikejgray'],
    'skill-moviemaster.json': ['file name must be skill-moviemaster-builderjer.json for skill_id skill-moviemaster.builderjer'],
    'skill-naptime.json': ['file name must be skill-ovos-naptime-openvoiceos.json for skill_id skill-ovos-naptime.openvoiceos'],
    'skill-news.json': ['file name must be skill-ovos-news-openvoiceos.json for skill_id skill-ovos-news.openvoiceos'],
    'skill-parrot.json': ['file name must be skill-ovos-parrot-openvoiceos.json for skill_id skill-ovos-parrot.openvoiceos'],
    'skill-personal.json': ['file name must be ovos-skill-personal-openvoiceos.json for skill_id ovos-skill-personal.openvoiceos'],
    'skill-randomness.json': ['file name must be skill-randomness-openvoiceos.json for skill_id skill-randomness.openvoiceos'],
    'skill-somafm.json': ['file name must be skill-ovos-somafm-openvoiceos.json for skill_id skill-ovos-somafm.openvoiceos'],
    'skill-soundcloud.json': ['file name must be skill-ovos-soundcloud-openvoiceos.json for skill_id skill-ovos-soundcloud.openvoiceos'],
    'skill-tunein.json': ['file name must be skill-ovos-tunein-openvoiceos.json for skill_id skill-ovos-tunein.openvoiceos'],
    'skill-volume.json': ['file name must be skill-ovos-volume-openvoiceos.json for skill_id skill-ovos-volume.openvoiceos'],
    'skill-weather.json': ['file name must be ovos-skill-weather-openvoiceos.json for skill_id ovos-skill-weather.openvoiceos'],
    'skill-wiki.json': ['file name must be skill-ovos-wikipedia-openvoiceos.json for skill_id skill-ovos-wikipedia.openvoiceos'],
    'skill-wolfie.json': ['file name must be skill-ovos-wolfie-openvoiceos.json for skill_id skill-ovos-wolfie.openvoiceos'],
    'skill-wordnet.json': ['file name must be skill-ovos-wordnet-openvoiceos.json for skill_id skill-ovos-wordnet.openvoiceos'],
    'skill-youtube-music.json': ['file name must be skill-ovos-youtube-music-jarbasal.json for skill_id skill-ovos-youtube-music.jarbasal'],
    'skill-youtube.json': ['file name must be skill-ovos-youtube-openvoiceos.json for skill_id skill-ovos-youtube.openvoiceos'],
}


def main() -> int:
    actual = {}
    for path in sorted(RAW_JSONS.glob('*.json')):
        errors = check_entry(path)
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
