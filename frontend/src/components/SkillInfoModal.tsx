'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Skill } from '../types';
import { getIconByName } from '../utils/icons';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

interface SkillInfoModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onInstall?: () => void;
}

const SkillInfoModal = ({ skill, isOpen, onClose, onInstall }: SkillInfoModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen || !skill || !mounted) return null;

  // Get the icon component from react-icons
  const IconComponent = getIconByName(skill.icon);
  const isOfficial = skill.skill_id?.endsWith('.openvoiceos') ?? false;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div
          className="bg-white dark:bg-stone-900 rounded-lg shadow-xl max-w-2xl w-full my-auto border border-gray-200 dark:border-stone-700 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-stone-700 p-4 sm:p-5 flex-shrink-0">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded bg-gray-100 dark:bg-stone-800 p-2 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-stone-300">
                  <IconComponent className="w-full h-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                      {skill.name || 'Unknown Skill'}
                    </h2>
                    {isOfficial && (
                      <RiVerifiedBadgeFill
                        className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-gray-100 flex-shrink-0 mt-1"
                        title="Official Open Voice OS Plugin"
                        aria-label="Official Open Voice OS Plugin"
                      />
                    )}
                  </div>
                  {skill.package_name && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-stone-400 mt-1 truncate">
                      {skill.package_name}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-stone-300 p-1 rounded transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Description */}
            {skill.description && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                  Description
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-stone-300 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            )}

            {/* Skill ID */}
            {skill.skill_id && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                  Skill ID
                </h3>
                <div className="bg-gray-50 dark:bg-stone-800 p-2.5 sm:p-3 rounded border border-gray-200 dark:border-stone-700">
                  <p className="text-xs sm:text-sm font-mono text-gray-900 dark:text-white break-all">
                    {skill.skill_id}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 uppercase tracking-wide">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skill.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-gray-100 dark:bg-stone-800 text-gray-700 dark:text-stone-300 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm border border-gray-200 dark:border-stone-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            {skill.examples && skill.examples.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 uppercase tracking-wide">
                  Voice Commands
                </h3>
                <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {skill.examples.slice(0, 15).map((example: string, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gray-50 dark:bg-stone-800 p-2.5 sm:p-3 rounded border border-gray-200 dark:border-stone-700"
                    >
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-stone-300">
                        {example}
                      </p>
                    </div>
                  ))}
                  {skill.examples.length > 15 && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-stone-400 text-center py-2">
                      +{skill.examples.length - 15} more examples
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Author & Version */}
            {(skill.author || skill.version) && (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
                {skill.author && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 uppercase tracking-wide">
                      Author
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-stone-300">{skill.author}</p>
                  </div>
                )}
                {skill.version && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 uppercase tracking-wide">
                      Version
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-stone-300">{skill.version}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-stone-700 p-3 sm:p-4 bg-gray-50 dark:bg-stone-800/50 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {skill.source && (
                <a
                  href={skill.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-900 hover:bg-gray-800 dark:bg-stone-700 dark:hover:bg-stone-600 text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded transition-colors text-center text-sm sm:text-base"
                >
                  View Source
                </a>
              )}
              {onInstall && (
                <button
                  onClick={onInstall}
                  className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded transition-colors text-sm sm:text-base"
                >
                  Install Skill
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 sm:px-6 bg-white dark:bg-stone-900 hover:bg-gray-100 dark:hover:bg-stone-800 text-gray-900 dark:text-white font-medium py-2 sm:py-2.5 rounded transition-colors border border-gray-300 dark:border-stone-600 text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default SkillInfoModal;
