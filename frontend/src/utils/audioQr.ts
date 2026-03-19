/**
 * Audio QR Code Utility for Skill Installation
 * Uses the GGWave library to encode/decode audio signals
 * Matches the working implementation from gh-pages branch
 */

export interface AudioQRData {
  skill_id: string;
  name: string;
  source: string;
  package_name?: string;
  description?: string;
  tags?: string[];
  timestamp: number;
}

let audioContext: any = null;
let ggwaveModule: any = null;
let ggwaveInstance: any = null;

declare global {
  interface Window {
    ggwave_factory?: () => Promise<any>;
  }
}

/**
 * Helper function to convert typed arrays (matching gh-pages implementation)
 */
function convertTypedArray(src: any, type: any): any {
  const buffer = new ArrayBuffer(src.byteLength);
  new src.constructor(buffer).set(src);
  return new type(buffer);
}

/**
 * Initialize GGWave with proper parameters (matching gh-pages)
 */
async function initGGWave() {
  if (ggwaveInstance) return ggwaveInstance;
  
  try {
    // Get the ggwave module from window (injected by ggwave.js script)
    if (!window.ggwave_factory) {
      throw new Error('ggwave_factory not found - ensure ggwave.js is loaded');
    }
    
    ggwaveModule = await window.ggwave_factory();
    
    // Create AudioContext with explicit 48000 Hz (matching gh-pages)
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 48000
      });
    }
    
    // Initialize with parameters (matching gh-pages)
    const parameters = ggwaveModule.getDefaultParameters();
    parameters.sampleRateInp = audioContext.sampleRate;
    parameters.sampleRateOut = audioContext.sampleRate;
    ggwaveInstance = ggwaveModule.init(parameters);
    
    console.log('GGWave initialized with 48000 Hz sample rate');
    return ggwaveInstance;
  } catch (error) {
    console.error('Failed to initialize GGWave:', error);
    throw error;
  }
}

/**
 * Encode skill data to audio using ggwave (matching gh-pages implementation)
 */
export async function encodeSkilAsAudioQR(skill: any): Promise<Float32Array | null> {
  try {
    const instance = await initGGWave();
    const module = ggwaveModule;
    
    // Send only skill_id with PIP: prefix (matching gh-pages: "PIP:" + packageName)
    const payload = `PIP: ${skill.package_name || skill.skill_id}`;
    // Encode using the instance - using DT protocol which has minimal sync tones
    const waveform = module.encode(
      instance,
      payload,
      module.ProtocolId.GGWAVE_PROTOCOL_DT_FAST,  // Changed from AUDIBLE_FAST to DT_FAST (less intrusive)
      10
    );
    
    // Convert to Float32Array (matching gh-pages convertTypedArray helper)
    const encoded = convertTypedArray(waveform, Float32Array);
    
    console.log('Encoded audio:', encoded.length, 'samples at 48000 Hz');
    return encoded;
  } catch (error) {
    console.error('Encoding error:', error);
    return null;
  }
}

/**
 * Decode audio to skill data using ggwave
 */
export async function decodeAudioQR(audio: ArrayBuffer): Promise<AudioQRData | null> {
  try {
    const instance = await initGGWave();
    const module = ggwaveModule;

    const decoded = module.decode(instance, new Float32Array(audio), module.ProtocolId.GGWAVE_PROTOCOL_DT_FAST);
    return decoded ? JSON.parse(decoded) : null;
  } catch (error) {
    console.error('Decoding error:', error);
    return null;
  }
}

/**
 * Play encoded audio through speaker (matching gh-pages implementation)
 */
export async function playAudioQR(encodedAudio: Float32Array): Promise<void> {
  if (typeof window === 'undefined') return;

  return new Promise((resolve) => {
    try {
      // Ensure audio context is initialized with 48000 Hz
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 48000
        });
      }
      
      // Create buffer with the correct 48000 Hz sample rate
      const buffer = audioContext.createBuffer(1, encodedAudio.length, audioContext.sampleRate);
      buffer.getChannelData(0).set(encodedAudio);
      
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);

      source.onended = () => {
        resolve();
      };

      source.start(0);
    } catch (error) {
      console.error('Error playing audio QR:', error);
      resolve();
    }
  });
}

