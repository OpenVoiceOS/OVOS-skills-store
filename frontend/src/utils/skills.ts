interface Skill {
  name?: string;
  description?: string;
  tags?: string[];
  [key: string]: any;
}

/**
 * Filter skills based on search query
 */
export const filterSkills = (skills: Skill[], query: string): Skill[] => {
  if (!query.trim()) return skills;
  
  const lowerQuery = query.toLowerCase();
  return skills.filter(skill => {
    const skillName = skill?.name || '';
    const skillDesc = skill?.description || '';
    
    return (
      skillName.toLowerCase().includes(lowerQuery) ||
      skillDesc.toLowerCase().includes(lowerQuery)
    );
  });
};

/**
 * Filter skills by category/tag
 */
export const filterSkillsByCategory = (
  skills: Skill[],
  category: string | null
): Skill[] => {
  if (!category) return skills;
  
  return skills.filter(skill => {
    const tags = skill?.tags || [];
    return tags.includes(category);
  });
};

/**
 * Get unique categories from all skills
 */
export const getCategories = (skills: Skill[]): string[] => {
  const categories = new Set<string>();
  
  skills.forEach(skill => {
    const tags = skill?.tags || [];
    tags.forEach(tag => {
      if (tag && typeof tag === 'string') {
        categories.add(tag);
      }
    });
  });
  
  return Array.from(categories).sort();
};

/**
 * Count skills per category
 */
export const countSkillsByCategory = (
  skills: Skill[]
): { [key: string]: number } => {
  const counts: { [key: string]: number } = { all: skills.length };
  
  skills.forEach(skill => {
    const tags = skill?.tags || [];
    tags.forEach(tag => {
      if (tag && typeof tag === 'string') {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    });
  });
  
  return counts;
};

/**
 * Get random items from an array
 */
export const getRandomItems = <T,>(items: T[], count: number): T[] => {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, items.length));
};
