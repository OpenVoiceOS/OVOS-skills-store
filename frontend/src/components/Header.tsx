interface HeaderProps {
  currentPage: 'home' | 'categories' | 'category-detail' | 'submit';
  onPageChange: (page: 'home' | 'categories' | 'category-detail' | 'submit') => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const Header = ({
  currentPage,
  onPageChange,
  searchValue,
  onSearchChange,
}: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-stone-900 border-b border-gray-200 dark:border-stone-700 sticky top-0 z-40">
      {/* Top bar with logo and search */}
      <div className="py-3 md:py-6 border-b border-gray-200 dark:border-stone-700">
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/ovos_logo.png" alt="Logo" className="w-14 md:w-20 mr-2 md:mr-4" />
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Plugin Marketplace
              </h1>
            </div>

            {/* Search Bar */}
            {currentPage === 'home' && (
              <div className="w-full md:w-96">
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={e => onSearchChange(e.target.value)}
                    placeholder="Search skills..."
                    aria-label="Search skills"
                    className="w-full px-4 py-2 pl-10 rounded border border-gray-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm md:text-base"
                  />
                  <svg
                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="flex gap-2 sm:gap-4 md:gap-8 border-b border-gray-200 dark:border-stone-700 overflow-x-auto md:justify-between">
          <div className="flex gap-2 sm:gap-4 md:gap-8">
            <button
              onClick={() => onPageChange('home')}
              className={`py-3 md:py-4 px-2 md:px-4 font-medium transition-colors border-b-2 whitespace-nowrap text-sm md:text-base ${
                currentPage === 'home'
                  ? 'text-red-600 border-red-600'
                  : 'text-gray-600 dark:text-stone-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1 md:gap-2">
                  Home
              </span>
            </button>
            <button
              onClick={() => onPageChange('categories')}
              className={`py-3 md:py-4 px-2 md:px-4 font-medium transition-colors border-b-2 whitespace-nowrap text-sm md:text-base ${
                currentPage === 'categories'
                  ? 'text-red-600 border-red-600'
                  : 'text-gray-600 dark:text-stone-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1 md:gap-2">
                <span>Categories</span>
              </span>
            </button>
          </div>
          <button
            onClick={() => onPageChange('submit')}
            className={`py-3 md:py-4 px-2 md:px-4 font-medium transition-colors border-b-2 whitespace-nowrap text-sm md:text-base ${
              currentPage === 'submit'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 dark:text-stone-400 border-transparent hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1 md:gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Submit Skill</span>
              <span className="sm:hidden">Submit</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
