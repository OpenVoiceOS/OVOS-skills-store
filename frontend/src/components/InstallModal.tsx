'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { encodeSkilAsAudioQR, playAudioQR } from '../utils/audioQr';

interface InstallModalProps {
  skillId: string;
  skillName: string;
  skillSource?: string;
  skillPackageName?: string;
  skillDescription?: string;
  skillTags?: string[];
  isOpen: boolean;
  onClose: () => void;
}

const InstallModal: React.FC<InstallModalProps> = ({
  skillId,
  skillName,
  skillSource,
  skillPackageName,
  skillDescription,
  skillTags,
  isOpen,
  onClose,
}) => {
  const [isEncoding, setIsEncoding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'encoding' | 'ready' | 'playing' | 'complete' | 'error'>('idle');
  const encodedAudioRef = useRef<Float32Array | null>(null);
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

  useEffect(() => {
    if (isOpen) {
      handleEncode();
    }
  }, [isOpen]);

  const handleEncode = async () => {
    setIsEncoding(true);
    setError(null);
    setStatus('encoding');

    try {
      const skill = {
        skill_id: skillId,
        name: skillName,
        source: skillSource,
        package_name: skillPackageName,
        description: skillDescription,
        tags: skillTags,
      };

      const encoded = await encodeSkilAsAudioQR(skill);

      if (!encoded) {
        throw new Error('Failed to encode skill data');
      }

      encodedAudioRef.current = encoded;
      setStatus('ready');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setStatus('error');
      console.error('Encoding error:', err);
    } finally {
      setIsEncoding(false);
    }
  };

  const handlePlay = async () => {
    if (!encodedAudioRef.current) {
      setError('No audio encoded. Please try again.');
      return;
    }

    setIsPlaying(true);
    setStatus('playing');
    setError(null);

    try {
      await playAudioQR(encodedAudioRef.current);
      setIsPlaying(false);
      setStatus('complete');
      setTimeout(() => setStatus('ready'), 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Playback failed';
      setError(errorMessage);
      setIsPlaying(false);
      setStatus('error');
    }
  };

  if (!isOpen || !mounted) return null;

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
          className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md my-auto border border-gray-200 dark:border-gray-700 flex flex-col max-h-[85vh] sm:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 sm:p-5 flex-shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Install Skill
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {skillName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Status Display */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center justify-center">
                {/* Status Icon */}
                <div className="mb-3 sm:mb-4">
                  {status === 'encoding' && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                  )}
                  {status === 'ready' && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {status === 'playing' && (
                    <div className="relative">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 dark:bg-red-500 rounded-full animate-pulse" />
                      </div>
                      <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-red-400/30 dark:bg-red-400/20 rounded-full animate-ping" />
                    </div>
                  )}
                  {status === 'complete' && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-9 h-9 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  {status === 'idle' && (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-400 dark:bg-gray-600 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Status Text */}
                <div className="text-center">
                  {status === 'idle' && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Ready to transmit</p>
                  )}
                  {status === 'encoding' && (
                    <p className="text-red-600 dark:text-red-400 text-sm sm:text-base font-semibold">Preparing transmission...</p>
                  )}
                  {status === 'ready' && (
                    <p className="text-green-600 dark:text-green-400 text-sm sm:text-base font-semibold">Ready to play</p>
                  )}
                  {status === 'playing' && (
                    <p className="text-red-600 dark:text-red-400 text-sm sm:text-base font-semibold">Transmitting audio</p>
                  )}
                  {status === 'complete' && (
                    <p className="text-green-600 dark:text-green-400 text-sm sm:text-base font-semibold">Transmission complete</p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-600 dark:text-red-400 text-sm sm:text-base font-semibold">Error occurred</p>
                  )}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4">
              <ol className="space-y-1.5 sm:space-y-2 text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>Position your OVOS device near the speaker</li>
                <li>Press the play button to start transmission</li>
                <li>Keep device close until transmission completes</li>
              </ol>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3 sm:p-4">
                <p className="text-sm text-red-700 dark:text-red-200">
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handlePlay}
                disabled={!encodedAudioRef.current || isPlaying || isEncoding}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded transition-colors text-sm sm:text-base"
              >
                {isPlaying ? 'Playing...' : status === 'complete' ? 'Play Again' : 'Play'}
              </button>
              <button
                onClick={onClose}
                className="px-4 sm:px-6 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-medium py-2 sm:py-2.5 rounded transition-colors border border-gray-300 dark:border-gray-600 text-sm sm:text-base"
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

export default InstallModal;
