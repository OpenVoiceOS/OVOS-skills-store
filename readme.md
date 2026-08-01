# OVOS Skills Store

OVOS Skills Store is the skill store for OpenVoiceOS. OVOS community developers submit their skills here. The OVOS development team also hosts its own skills here.

## Submit a skill

To submit a skill, complete these steps:

1. Create a JSON file for your skill. See the [skill.json specification](https://openvoiceos.github.io/ovos-technical-manual/skill_json/) for the format.
2. License your skill under an OSI-approved open-source license, or release it into the public domain. The OVOS development team grants exceptions only by special permission, and only when a skill integrates OVOS with software that is extremely valuable to users, extremely popular, privacy-respecting, and cannot be integrated any other way (for example, a well-known streaming service or a video game console with no open-source alternative). The team closes submissions of utility skills under a proprietary license as invalid.
3. Submit a pull request to [OpenVoiceOS/OVOS-skills-store](https://github.com/OpenVoiceOS/OVOS-skills-store).

An OVOS developer or an authorized skill reviewer reviews each submission. Once a reviewer merges the pull request, the store lists the skill.

## Marketplace

The store publishes a JSON feed at [skills.json](https://openvoiceos.github.io/OVOS-skills-store/skills.json). Third-party user interfaces and applications can consume this feed.

GitHub Pages publishes the store at [openvoiceos.github.io/OVOS-skills-store](https://openvoiceos.github.io/OVOS-skills-store/).

To set up your own marketplace, fork this repository.

## Related projects

- [OpenVoiceOS/ovos-technical-manual](https://github.com/OpenVoiceOS/ovos-technical-manual) — documents the skill.json specification and other OVOS interfaces.
