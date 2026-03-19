import type { Skill } from '../types';
import SkillCard from './SkillCard';

interface CategoryDetailPageProps {
  category: string;
  skills: Skill[];
  onSkillClick: (skill: Skill) => void;
  onBack: () => void;
}

const CategoryDetailPage = ({
  category,
  skills,
  onSkillClick,
  onBack,
}: CategoryDetailPageProps) => {
  return (
    <div>
      {/* Back button and header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:hover:text-red-500 font-medium mb-4 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Categories
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          {category}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {skills.length} skill{skills.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Skills Grid */}
      {skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              {...skill}
              onClick={() => onSkillClick(skill)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No skills found in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
