'use client';

import React, { useState, useRef, useEffect } from 'react';
import { encodeSkilAsAudioQR, playAudioQR } from '../utils/audioQr';

interface AudioQRInstallProps {
  skillId: string;
  skillName: string;
  skillSource?: string;
  skillPackageName?: string;
  skillDescription?: string;
  skillTags?: string[];
  onClose?: () => void;
}

const AudioQRInstall: React.FC<AudioQRInstallProps> = ({
  skillId,
  skillName,
  skillSource,
  skillPackageName,
  skillDescription,
  skillTags,
  onClose,
}) => {
  const [isEncoding, setIsEncoding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [animationStep, setAnimationStep] = useState('idle');
  const encodedAudioRef = useRef<Float32Array | null>(null);

  // Auto-encode on mount
  useEffect(() => {
    handleEncode();
  }, []);

  // Encode skill data to audio
  const handleEncode = async () => {
    setIsEncoding(true);
    setError(null);
    setAnimationStep('encoding');

    try {
      const skill = {
        skill_id: skillId,
        name: skillName,
        source: skillSource,
        package_name: skillPackageName,
        description: skillDescription,
        tags: skillTags,
      };

      // Use the utility function
      const encoded = await encodeSkilAsAudioQR(skill);

      if (!encoded) {
        throw new Error('Failed to encode skill data');
      }

      // Store the encoded audio directly (it's already a Float32Array from the utility)
      encodedAudioRef.current = encoded;
      setAnimationStep('ready');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setAnimationStep('error');
      console.error('Encoding error:', err);
    } finally {
      setIsEncoding(false);
    }
  };

  // Play encoded audio
  const handlePlay = async () => {
    if (!encodedAudioRef.current) {
      setError('No audio encoded. Please try again.');
      return;
    }

    setIsPlaying(true);
    setAnimationStep('playing');
    setError(null);

    try {
      await playAudioQR(encodedAudioRef.current);
      setIsPlaying(false);
      setAnimationStep('complete');
      setHasPlayed(true);
      setTimeout(() => setAnimationStep('ready'), 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Playback failed';
      setError(errorMessage);
      setIsPlaying(false);
      setAnimationStep('error');
    }
  };

  const duration = encodedAudioRef.current
    ? `${(encodedAudioRef.current.length / 48000).toFixed(2)}s`
    : 'N/A';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span>🔊</span> Install {skillName}
        </h2>
        {skillPackageName && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{skillPackageName}</p>
        )}
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        Use audio transmission to install this skill. Keep your OVOS device near the speaker.
      </p>

      {/* Animation Display */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 flex flex-col items-center justify-center min-h-[180px] border border-blue-200 dark:border-blue-700 mb-6">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Speaker */}
          <div className="absolute flex flex-col items-center">
            {/* Speaker Icon */}
            <div className="text-5xl mb-2">🔉</div>

            {/* Sound waves - appear during playing */}
            {(animationStep === 'playing' || animationStep === 'encoding') && (
              <>
                <div
                  className="absolute rounded-full border-2 border-blue-400 dark:border-blue-300"
                  style={{
                    animation: 'pulse-wave 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    width: '60px',
                    height: '60px',
                  }}
                />
                <div
                  className="absolute rounded-full border-2 border-blue-300 dark:border-blue-200 opacity-50"
                  style={{
                    animation: 'pulse-wave 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.3s',
                    width: '90px',
                    height: '90px',
                  }}
                />
              </>
            )}

            {/* Phone with animation */}
            <div
              className="absolute transition-all duration-500"
              style={{
                left:
                  animationStep === 'playing'
                    ? '60px'
                    : animationStep === 'complete'
                      ? '65px'
                      : '20px',
                top: animationStep === 'playing' ? '-10px' : '10px',
              }}
            >
              <div className="text-4xl">📱</div>
              {animationStep === 'playing' && (
                <div className="text-xs font-bold text-blue-600 dark:text-blue-300 mt-1 text-center">
                  📡 Receiving...
                </div>
              )}
              {animationStep === 'complete' && (
                <div className="text-xs font-bold text-green-600 dark:text-green-300 mt-1 text-center">
                  ✓ Complete!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="mt-12 text-center">
          {animationStep === 'idle' && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">Ready to transmit</p>
          )}
          {animationStep === 'encoding' && (
            <p className="text-blue-600 dark:text-blue-300 font-semibold flex items-center justify-center gap-2">
              <span className="inline-block animate-spin">⚙️</span>
              Preparing...
            </p>
          )}
          {animationStep === 'ready' && (
            <p className="text-green-600 dark:text-green-300 font-semibold text-sm">
              Ready! Press Play
            </p>
          )}
          {animationStep === 'playing' && (
            <p className="text-blue-600 dark:text-blue-300 font-semibold">
              🔊 Transmitting... ({duration})
            </p>
          )}
          {animationStep === 'complete' && (
            <p className="text-green-600 dark:text-green-300 font-semibold">
              ✓ Transmission complete!
            </p>
          )}
          {animationStep === 'error' && (
            <p className="text-red-600 dark:text-red-300 font-semibold">Error occurred</p>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
          <span>📋</span> Instructions
        </h3>
        <ol className="space-y-1 text-xs text-amber-800 dark:text-amber-200 list-decimal list-inside">
          <li>Position device with scanner app nearby</li>
          <li>Click the Play button below</li>
          <li>Keep device near speaker during transmission</li>
          <li>Skill installs automatically when received</li>
        </ol>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3 mb-6">
          <p className="text-sm text-red-700 dark:text-red-200 flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePlay}
          disabled={!encodedAudioRef.current || isPlaying || isEncoding}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isPlaying ? (
            <>
              <span className="inline-block animate-spin">🔊</span>
              Playing...
            </>
          ) : hasPlayed ? (
            <>
              <span>🔁</span>
              Replay
            </>
          ) : (
            <>
              <span>▶️</span>
              Play
            </>
          )}
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="px-6 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        )}
      </div>

      {/* Audio Info */}
      {encodedAudioRef.current && (
        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 space-y-1 mt-4 border border-gray-200 dark:border-gray-600">
          <div>
            <span className="font-semibold">Duration:</span> {duration}
          </div>
          <div>
            <span className="font-semibold">Sample Rate:</span> 48000 Hz
          </div>
          {skillPackageName && (
            <div className="truncate">
              <span className="font-semibold">Package:</span> {skillPackageName}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse-wave {
          0% {
            transform: scale(0.95);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AudioQRInstall;
