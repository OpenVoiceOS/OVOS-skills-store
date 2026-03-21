'use client';

import { useState } from 'react';
import InstallModal from './InstallModal';
import { getIconByName } from '../utils/icons';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

interface SkillCardProps {
  name?: string;
  description?: string;
  icon?: string;
  version?: string;
  author?: string;
  url?: string;
  skill_id?: string;
  source?: string;
  package_name?: string;
  tags?: string[];
  onClick?: () => void;
}

const SkillCard = ({
  name = 'Unknown Skill',
  description,
  icon,
  version,
  author,
  url,
  skill_id,
  source,
  package_name,
  tags,
  onClick,
}: SkillCardProps) => {
  const isOfficial = skill_id?.endsWith('.openvoiceos') ?? false;
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Get the icon component from react-icons
  const IconComponent = getIconByName(icon);

  return (
    <>
      <div
        onClick={onClick}
        className="bg-white dark:bg-stone-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-stone-700 flex flex-col cursor-pointer hover:scale-105 h-64"
      >
        {/* Header with icon */}
        <div className="h-20 bg-gray-100 dark:bg-stone-700 p-2 flex items-center justify-center flex-shrink-0 border-b border-gray-200 dark:border-stone-600">
          <div className="text-gray-600 dark:text-stone-300">
            <IconComponent className="w-10 h-10" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-grow">
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate flex-1">
              {name}
            </h3>
            {isOfficial && (
              <RiVerifiedBadgeFill
                className="w-4 h-4 text-gray-900 dark:text-gray-100 flex-shrink-0"
                title="Official Open Voice OS Plugin"
              />
            )}
          </div>

          {description && (
            <p className="text-xs text-gray-600 dark:text-stone-400 mt-1 line-clamp-2">
              {description}
            </p>
          )}

          {/* Metadata */}
          <div className="mt-2 space-y-0.5 text-xs text-gray-500 dark:text-stone-500">
            {author && <div>{author}</div>}
            {version && <div>v{version}</div>}
          </div>

          {/* Action button - pushed to bottom */}
          <div className="mt-auto pt-4">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full inline-block bg-gray-900 hover:bg-gray-800 dark:bg-stone-700 dark:hover:bg-stone-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-center text-sm"
              >
                View Details
              </a>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInstallModal(true);
                }}
                className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-center text-sm"
              >
                Install
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Install Modal */}
      {showInstallModal && skill_id && (
        <InstallModal
          skillId={skill_id}
          skillName={name}
          skillSource={source}
          skillPackageName={package_name}
          skillDescription={description}
          skillTags={tags}
          isOpen={showInstallModal}
          onClose={() => setShowInstallModal(false)}
        />
      )}
    </>
  );
};

export default SkillCard;
