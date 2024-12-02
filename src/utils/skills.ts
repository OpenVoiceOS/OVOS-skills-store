export async function getSkills() {
  const skillFiles = import.meta.glob('../data/skills/*.json');
  const skills = [];

  for (const path in skillFiles) {
    const skill = await skillFiles[path]();
    skills.push(skill.default);
  }

  return skills;
}