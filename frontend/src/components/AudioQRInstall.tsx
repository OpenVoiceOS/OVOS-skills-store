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
}

const AudioQRInstall: React.FC<AudioQRInstallProps> = ({
  skillId,
  skillName,
  skillSource,
  skillPackageName,
  skillDescription,
  skillTags,
}) => {
  const [isEncoding, setIsEncoding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [animationStep, setAnimationStep] = useState('idle');
  const encodedAudioRef = useRef<Float32Array | null>(null);


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
      setSuccess(true);
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
      setError('No audio encoded. Please click "Prepare Audio QR" first.');
      return;
    }

    setIsPlaying(true);
    setAnimationStep('playing');
    setError(null);

    try {
      await playAudioQR(encodedAudioRef.current);
      setIsPlaying(false);
      setAnimationStep('complete');
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
    <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span>🔊</span> Install via Audio QR
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Transmit skill via audio signal. Hold your OVOS device near the speaker.
        </p>
      </div>

      {/* Animation Display */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] border border-blue-200 dark:border-blue-700">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Speaker */}
          <div className="absolute flex flex-col items-center">
            {/* Speaker Cone */}
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
                <div className="text-xs font-bold text-blue-600 dark:text-blue-300 mt-1">
                  📡 Receiving...
                </div>
              )}
              {animationStep === 'complete' && (
                <div className="text-xs font-bold text-green-600 dark:text-green-300 mt-1">
                  ✓ Complete!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="mt-12 text-center">
          {animationStep === 'idle' && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Click "Prepare Audio QR" to start
            </p>
          )}
          {animationStep === 'encoding' && (
            <p className="text-blue-600 dark:text-blue-300 font-semibold flex items-center justify-center gap-2">
              <span className="inline-block animate-spin">⚙️</span>
              Encoding skill data...
            </p>
          )}
          {animationStep === 'ready' && (
            <p className="text-green-600 dark:text-green-300 font-semibold">
              ✓ Audio ready! Click "Play Audio QR"
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
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
        <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
          <span>📋</span> How to use Audio QR
        </h4>
        <ol className="space-y-1 text-sm text-amber-800 dark:text-amber-200 list-decimal list-inside">
          <li>Click "Prepare Audio QR" to encode the skill</li>
          <li>Position your OVOS device (with scanner app) nearby</li>
          <li>Click "Play Audio QR" to transmit via audio</li>
          <li>Keep the device still near the speaker</li>
          <li>Skill will install automatically when received</li>
        </ol>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3">
          <p className="text-sm text-red-700 dark:text-red-200 flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleEncode}
          disabled={isEncoding || isPlaying}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isEncoding ? (
            <>
              <span className="inline-block animate-spin">⚙️</span>
              Preparing...
            </>
          ) : (
            <>
              <span>🔧</span>
              Prepare Audio QR
            </>
          )}
        </button>

        <button
          onClick={handlePlay}
          disabled={!encodedAudioRef.current || isPlaying || isEncoding}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isPlaying ? (
            <>
              <span className="inline-block animate-spin">🔊</span>
              Playing...
            </>
          ) : (
            <>
              <span>▶️</span>
              Play Audio QR
            </>
          )}
        </button>
      </div>

      {/* Audio Info */}
      {encodedAudioRef.current && (
        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div>
            <span className="font-semibold">Duration:</span> {duration}
          </div>
          <div>
            <span className="font-semibold">Sample Rate:</span>{' '}
            48000 Hz
          </div>
          <div>
            <span className="font-semibold">Payload Size:</span>{' '}
            {JSON.stringify({
              skill_id: skillId,
              name: skillName,
              source: skillSource,
              package_name: skillPackageName,
              description: skillDescription,
              tags: skillTags,
              timestamp: Date.now(),
            }).length}{' '}
            bytes
          </div>
        </div>
      )}

      {/* CSS for animations */}
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
