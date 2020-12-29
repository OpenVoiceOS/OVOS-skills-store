from os import listdir
from os.path import dirname
import json

output = {
    "version": "https://jsonfeed.org/version/1",
    "title": "OpenVoiceOS skills store",
    "description": "Welcome to OpenVoiceOS skills store",
    "home_page_url": "https://openvoiceos.github.io/OVOS-skills-store",
    "feed_url": "https://openvoiceos.github.io/OVOS-skills-store/skills.json",
    "items": []
}

for skill in [f for f in listdir(dirname(__file__)) if f.endswith(".json")]:
    with open(skill) as f:
        output["items"].append(json.load(f))

with open("skills.json", "w") as f:
    json.dump(output, f, indent=4)
