import { getPredefinedCategories, getCategoryIcon, getCategoryDescription } from '../utils/categories.tsx';

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
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Browse Categories
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Explore skills by category to find what you need
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
        {categories.map((category) => {
          const skillCount = skillCounts[category] || 0;
          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="bg-white dark:bg-stone-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-stone-700 text-left group hover:border-red-500 dark:hover:border-red-500 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-xl flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-200 shadow-sm flex-shrink-0">
                  <div className="text-red-600 dark:text-red-300 group-hover:text-white transition-colors">
                    {getCategoryIcon(category)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors capitalize truncate">
                      {category}
                    </h3>
                    <div className="bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-red-200 dark:border-red-800 flex-shrink-0">
                      {skillCount}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-stone-400 line-clamp-1">
                    {getCategoryDescription(category)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-16 md:py-20">
          <div className="bg-gray-100 dark:bg-stone-800 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-gray-500 dark:text-stone-400 text-lg">No categories found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
