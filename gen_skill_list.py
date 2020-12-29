from os import listdir
from os.path import dirname
import json

output = []
for skill in [f for f in listdir(dirname(__file__)) if f.endswith(".json")]:
    with open(skill) as f:
        output.append(json.load(f))

with open("skill_list", "w") as f:
    json.dump(output, f, indent=4)
