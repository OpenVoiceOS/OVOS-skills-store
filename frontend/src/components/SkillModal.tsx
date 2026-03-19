'use client';

import AudioQRInstall from './AudioQRInstall';
import type { Skill } from '../types';

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal = ({ skill, isOpen, onClose }: SkillModalProps) => {
  if (!isOpen || !skill) return null;

  return (
    <>
      {/* Backdrop */}
        <div
        className="fixed inset-0 bg-gray-500/50 z-40 transition-opacity"
        onClick={onClose}
        />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {skill.icon ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-16 h-16 rounded object-contain bg-gray-100 dark:bg-gray-700 p-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">📦</span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {skill.name || 'Unknown Skill'}
            </h2>
            {skill.package_name && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{skill.package_name}</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors flex-shrink-0 dark:text-gray-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            {skill.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  About
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            )}

            {/* Skill ID */}
            {skill.skill_id && (
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Skill ID</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                  {skill.skill_id}
                </p>
              </div>
            )}

            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium border border-red-200 dark:border-red-800"
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Voice Commands
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {skill.examples.slice(0, 10).map((example: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded"
                    >
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {example}
                      </p>
                    </div>
                  ))}
                  {skill.examples.length > 10 && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-2">
                      +{skill.examples.length - 10} more examples
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Audio QR Installation */}
            <AudioQRInstall
              skillId={skill.skill_id || 'unknown'}
              skillName={skill.name || 'Unknown Skill'}
              skillSource={skill.source}
              skillPackageName={skill.package_name}
              skillDescription={skill.description}
              skillTags={skill.tags}
            />

            {/* Links */}
            <div className="flex gap-3 pt-4">
              {skill.source && (
                <a
                  href={skill.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-medium py-2 px-4 rounded transition-colors text-center"
                >
                  View on GitHub
                </a>
              )}
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillModal;
