import SkillCard from './SkillCard';

interface Skill {
  name: string;
  description?: string;
  icon?: string;
  version?: string;
  author?: string;
  url?: string;
  [key: string]: any;
}

interface FeaturedSectionProps {
  skills: Skill[];
  onSkillClick?: (skill: Skill) => void;
}

const FeaturedSection = ({ skills, onSkillClick }: FeaturedSectionProps) => {
  if (skills.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Skills
          </h2>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hand-picked skills worth exploring
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="h-full">
            <SkillCard
              {...skill}
              onClick={() => onSkillClick?.(skill)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
