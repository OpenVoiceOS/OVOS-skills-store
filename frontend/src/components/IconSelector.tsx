import { useState, useMemo } from 'react';
import { searchIcons, getPopularIcons, getIconByName } from '../utils/icons';

interface IconSelectorProps {
  selectedIcon?: string;
  onSelect: (iconName: string) => void;
  onBlur?: () => void;
}

const IconSelector = ({ selectedIcon, onSelect, onBlur }: IconSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopular, setShowPopular] = useState(true);

  const displayedIcons = useMemo(() => {
    if (!searchQuery && showPopular) {
      return getPopularIcons();
    }
    return searchIcons(searchQuery);
  }, [searchQuery, showPopular]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setShowPopular(false);
    } else {
      setShowPopular(true);
    }
  };

  const handleIconClick = (iconName: string) => {
    onSelect(iconName);
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={onBlur}
          placeholder="Search icons (e.g., music, weather, home)..."
          className="w-full px-4 py-2.5 pl-10 rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />
        <svg
          className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Selected Icon Preview */}
      {selectedIcon && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400">
            {(() => {
              const IconComponent = getIconByName(selectedIcon);
              return <IconComponent className="w-6 h-6" />;
            })()}
          </div>
          <span className="text-sm font-medium text-red-700 dark:text-red-300">
            Selected: {selectedIcon}
          </span>
        </div>
      )}

      {/* Section Header */}
      <div className="text-sm font-medium text-stone-700 dark:text-stone-300">
        {showPopular && !searchQuery ? 'Popular Icons' : `${displayedIcons.length} icons found`}
      </div>

      {/* Icons Grid */}
      <div className="max-h-80 overflow-y-auto border border-stone-200 dark:border-stone-600 rounded-lg p-4 bg-stone-50 dark:bg-stone-900">
        {displayedIcons.length === 0 ? (
          <div className="text-center py-8 text-stone-500 dark:text-stone-400">
            No icons found. Try a different search term.
          </div>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {displayedIcons.map((icon) => {
              const IconComponent = icon.component;
              const isSelected = selectedIcon === icon.name;

              return (
                <button
                  key={icon.name}
                  type="button"
                  onClick={() => handleIconClick(icon.name)}
                  className={`relative p-3 rounded-lg transition-all flex items-center justify-center ${
                    isSelected
                      ? 'bg-red-600 text-white scale-110'
                      : 'bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-400'
                  } border ${
                    isSelected
                      ? 'border-red-600'
                      : 'border-stone-200 dark:border-stone-700'
                  }`}
                  title={icon.name}
                >
                  <IconComponent className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-stone-500 dark:text-stone-400">
        {showPopular && !searchQuery
          ? 'Showing popular icons. Search to see all available icons.'
          : 'Click an icon to select it for your skill.'}
      </p>
    </div>
  );
};

export default IconSelector;
