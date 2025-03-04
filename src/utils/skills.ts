export interface Skill {
  skill_id: string;
  name: string;
  description: string;
  tags: string[];
  icon: string;
  images?: string[];
}

export async function getSkills() {
  const skillsData = await import('../../skills.json');
  return skillsData.default.items;
}

export function getFeaturedSkills(skills: Skill[]) {
  return skills.sort(() => Math.random() - 0.5).slice(0, 10);
}

export function getSkillsByCategory(skills: Skill[]) {
  return skills.reduce((acc, skill) => {
    skill.tags?.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(skill);
    });
    return acc;
  }, {});
}