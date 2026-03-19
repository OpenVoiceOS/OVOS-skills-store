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

# Get the root directory (parent of scripts dir)
root_dir = dirname(dirname(__file__))
raw_jsons_dir = join(root_dir, "raw_jsons")
public_dir = join(root_dir, "public")

# Read all JSON files from raw_jsons directory
for skill in [f for f in listdir(raw_jsons_dir) if f.endswith(".json")]:
    skill_path = join(raw_jsons_dir, skill)
    with open(skill_path) as f:
        output["items"].append(json.load(f))

# Output to public directory
output_file = join(public_dir, "skills.json")
with open(output_file, "w") as f:
    json.dump(output, f, indent=4)
    
print(f"Generated skills.json with {len(output['items'])} skills in {output_file}")
