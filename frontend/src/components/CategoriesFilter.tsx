interface CategoriesFilter {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  skillCount?: { [key: string]: number };
}

const CategoriesFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
  skillCount = {},
}: CategoriesFilter) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-2">
        {/* All button */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded border transition-colors ${
            selectedCategory === null
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-red-600 dark:hover:border-red-600'
          }`}
        >
          All {skillCount['all'] ? `(${skillCount['all']})` : ''}
        </button>

        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`px-4 py-2 rounded border transition-colors ${
              selectedCategory === category
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-red-600 dark:hover:border-red-600'
            }`}
          >
            {category} {skillCount[category] ? `(${skillCount[category]})` : ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
