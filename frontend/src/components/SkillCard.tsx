interface SkillCardProps {
  name?: string;
  description?: string;
  icon?: string;
  version?: string;
  author?: string;
  url?: string;
  onClick?: () => void;
}

const SkillCard = ({
  name = 'Unknown Skill',
  description,
  icon,
  version,
  author,
  url,
  onClick,
}: SkillCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col cursor-pointer hover:scale-105"
    >
      {/* Header with icon */}
      <div className="h-32 bg-gray-100 dark:bg-gray-700 p-4 flex items-center justify-center flex-shrink-0 border-b border-gray-200 dark:border-gray-600">
        {icon ? (
          <img
            src={icon}
            alt={name}
            className="w-16 h-16 object-contain rounded"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
            {description}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-500">
          {author && <div>👤 {author}</div>}
          {version && <div>📌 v{version}</div>}
        </div>

        {/* Action button - pushed to bottom */}
        <div className="mt-auto pt-4">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full inline-block bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-center text-sm"
            >
              View Details
            </a>
          ) : (
            <button
              className="w-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium py-2 px-4 rounded cursor-not-allowed text-sm"
              disabled
            >
              No Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
