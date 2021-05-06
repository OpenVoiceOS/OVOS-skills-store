from os import listdir, getcwd
from os.path import dirname, join
import json

output = {
    "version": "https://jsonfeed.org/version/1",
    "title": "OpenVoiceOS skills store",
    "description": "Welcome to OpenVoiceOS skills store",
    "home_page_url": "https://openvoiceos.github.io/OVOS-skills-store",
    "feed_url": "https://openvoiceos.github.io/OVOS-skills-store/skills.json",
    "items": []
}
dir_to_check = dirname(__file__) or join(getcwd(), "main")
for skill in [f for f in listdir(dir_to_check) if f.endswith(".json")]:
    with open(join(dir_to_check, skill)) as f:
        output["items"].append(json.load(f))

with open("skills.json", "w") as f:
    json.dump(output, f, indent=4)
