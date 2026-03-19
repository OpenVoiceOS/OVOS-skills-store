interface HeaderProps {
  currentPage: 'home' | 'categories' | 'category-detail';
  onPageChange: (page: 'home' | 'categories' | 'category-detail') => void;
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
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      {/* Top bar with logo and search */}
      <div className="py-4 md:py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                OVOS Skills Store
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
                    className="w-full px-4 py-2 pl-10 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onPageChange('home')}
            className={`py-4 px-4 font-medium transition-colors border-b-2 ${
              currentPage === 'home'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
                Home
            </span>
          </button>
          <button
            onClick={() => onPageChange('categories')}
            className={`py-4 px-4 font-medium transition-colors border-b-2 ${
              currentPage === 'categories'
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>Categories</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
