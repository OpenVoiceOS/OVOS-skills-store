Welcome to the OVOS Skills Store!

This is OpenVoiceOS' Skill Store, and is one of the app stores enabled by default with [OSM](https://github.com/OpenVoiceOS/ovos_skill_manager). This is where OVOS community developers can submit their skills. It's also where the OVOS dev team hosts our own skills!

Submitting a Skill is easy, and relatively painless, though a few steps need to be completed before your Skill can be accepted:

1. The version of your Skill which you intend to publish must be associated with a git tag.

2. You must create a JSON file for your Skill like the ones already present. Simply copy an existing file, and replace all the data with information about your Skill. NOTE: The git tag from step one goes in the field labeled "branch", not the field labeled "tags".

3. Your skill must be licensed under an OSI-approved open-source license, or released into the public domain, except by special permission from the OVOS dev team. Such permission is unlikely to be granted except in cases where your Skill integrates Mycroft or OVOS with software that is a) extremely valuable to users, b) extremely popular, c) privacy-respecting, and d) cannot be integrated any other way. (We're talking about things like a big-name streaming service, or integrating with a video game console. Big things with no open-source alternative. Submissions containing utility Skills under a proprietary license will be summarily closed as invalid.)

Once you have completed these steps, you can create a pull request to this repository, adding your JSON file. Your Skill will be reviewed as soon as possible by one or more OVOS developers or authorized Skill Reviewers.

Once your Skill has been reviewed, and the pull request is merged, your Skill should immediately be listed on the OVOS Skills Store, and become available for installation on any system running OSM!

---

On the JSON file:

* `branch` refers to the git tag mentioned above
* `desktop_file` refers to an XDG-compliant desktop entry. Most Skills should leave this value `false`
* `systemDeps` refers to operating system packages, which should be expressed as a list
* `icon` should be a web-hosted .png
* `folder` will literally become the name of the Skill's directory within your device's skills folder. The convention is `skillname.authorname`.
* `categories` can list as many categories as you like, and the Skill will appear under each in the Skills Store. `category` refers to the Skill's *primary* category, which is the one that will appear next to its entry when clicked.
* `tags` refers to other search terms you'd like to apply to this Skill