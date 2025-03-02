export async function getSkills() {
  const skillsData = await import('../../skills.json');
  return skillsData.default.items;
}