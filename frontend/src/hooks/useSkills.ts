import { useState, useEffect } from 'react';

interface Skill {
  name: string;
  description?: string;
  icon?: string;
  version?: string;
  author?: string;
  url?: string;
  [key: string]: any;
}

interface SkillsFeed {
  version: string;
  title: string;
  description: string;
  items: Skill[];
}

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch('/public/skills.json');
        if (!response.ok) {
          throw new Error(`Failed to load skills: ${response.statusText}`);
        }
        const data: SkillsFeed = await response.json();
        setSkills(data.items || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  return { skills, loading, error };
};
