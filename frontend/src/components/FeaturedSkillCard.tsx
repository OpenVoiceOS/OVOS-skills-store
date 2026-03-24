'use client';

import { useState } from 'react';
import InstallModal from './InstallModal';
import type { Skill } from '../types';
import { getIconByName } from '../utils/icons';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

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
  skill_id,
  source,
  package_name,
  tags,
  onClick,
}: FeaturedSkillCardProps) => {
  const isOfficial = skill_id?.endsWith('.openvoiceos') ?? false;
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Get the icon component from react-icons
  const IconComponent = getIconByName(icon);

  return (
    <>
      <div
        onClick={onClick}
        className="bg-white dark:bg-stone-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-stone-700 flex flex-col cursor-pointer hover:scale-105 min-h-[380px] max-h-[420px] mx-auto w-full"
      >
        {/* Header with larger icon */}
        <div className="h-40 bg-gray-100 dark:bg-stone-700 p-4 flex items-center justify-center flex-shrink-0 border-b border-gray-200 dark:border-stone-600">
          <div className="text-gray-600 dark:text-stone-300">
            <IconComponent className="w-24 h-24" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow overflow-y-auto">
          <div className="flex items-start gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
              {name}
            </h3>
            {isOfficial && (
              <RiVerifiedBadgeFill
                className="w-5 h-5 text-gray-900 dark:text-gray-100 flex-shrink-0 mt-0.5"
                title="Official Open Voice OS Plugin"
                aria-label="Official Open Voice OS Plugin"
              />
            )}
          </div>

          {description && (
            <p className="text-sm text-gray-600 dark:text-stone-400 mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Metadata */}
          <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-stone-500 flex-shrink-0">
            {author && <div className="truncate">{author}</div>}
            {version && <div className="truncate">v{version}</div>}
          </div>
        </div>

        {/* Action button - always at bottom */}
        <div className="p-5 pt-0 flex-shrink-0 bg-white dark:bg-stone-800">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full inline-block bg-gray-900 hover:bg-gray-800 dark:bg-stone-700 dark:hover:bg-stone-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 text-center"
            >
              View Details
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInstallModal(true);
              }}
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 text-center"
            >
              Install
            </button>
          )}
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

export default FeaturedSkillCard;
