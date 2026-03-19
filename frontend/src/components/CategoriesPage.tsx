import { getPredefinedCategories, getCategoryIcon } from '../utils/categories.tsx';

interface CategoriesPageProps {
  skillCounts: { [key: string]: number };
  onCategoryClick: (category: string) => void;
}

const CategoriesPage = ({
  skillCounts,
  onCategoryClick,
}: CategoriesPageProps) => {
  const categories = getPredefinedCategories();
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Browse Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore skills by category to find what you need
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryClick(category)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-red-600 dark:hover:border-red-600 hover:shadow-lg transition-all duration-300 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <span className="text-xl">{getCategoryIcon(category)}</span>
              </div>
              <span className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                {skillCounts[category] || 0}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
              {category}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {skillCounts[category] || 0} skill{skillCounts[category] !== 1 ? 's' : ''}
            </p>
          </button>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No categories found</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
