import type { Skill } from '../types';

interface FeaturedSkillCardProps extends Skill {
  onClick?: () => void;
}

const FeaturedSkillCard = ({
  name = 'Unknown Skill',
  description,
  icon,
  version,
  author,
  url,
  onClick,
}: FeaturedSkillCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col cursor-pointer hover:scale-105 min-h-[380px] max-h-[420px] mx-auto w-full"
    >
      {/* Header with larger icon */}
      <div className="h-40 bg-gray-100 dark:bg-gray-700 p-4 flex items-center justify-center flex-shrink-0 border-b border-gray-200 dark:border-gray-600">
        {icon ? (
          <img
            src={icon}
            alt={name}
            className="w-24 h-24 object-contain rounded"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded flex items-center justify-center">
            <span className="text-5xl">📦</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            {description}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-500 flex-shrink-0">
          {author && <div className="truncate">{author}</div>}
          {version && <div className="truncate">v{version}</div>}
        </div>
      </div>

      {/* Action button - always at bottom */}
      <div className="p-5 pt-0 flex-shrink-0 bg-white dark:bg-gray-800">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full inline-block bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 text-center"
            >
              View Details
            </a>
          ) : (
            <button
              className="w-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              No Link
            </button>
          )}
        </div>
      </div>
  );
};

export default FeaturedSkillCard;
