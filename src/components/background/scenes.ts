export type WaveScene = {
  colors: [string, string, string];
  amplitude: number;
  speed: number;
  yPosition: number;
  particleCount: number;
  opacity: number;
  scanline?: boolean;
  converge?: boolean;
};

export const waveScenes: Record<string, WaveScene> = {
  hero: { colors: ['#7C5CFF', '#22D3EE', '#F5A524'], amplitude: 1, speed: .72, yPosition: .5, particleCount: 58, opacity: .72 },
  quests: { colors: ['#6551C8', '#247E9A', '#B87935'], amplitude: .48, speed: .38, yPosition: .64, particleCount: 40, opacity: .42 },
  play: { colors: ['#EC4899', '#22D3EE', '#8B5CF6'], amplitude: 1.18, speed: 1.08, yPosition: .48, particleCount: 72, opacity: .78 },
  capture: { colors: ['#F5A524', '#FB7185', '#7C5CFF'], amplitude: .62, speed: .44, yPosition: .58, particleCount: 46, opacity: .56 },
  create: { colors: ['#3B82F6', '#22D3EE', '#7C5CFF'], amplitude: .76, speed: .66, yPosition: .52, particleCount: 54, opacity: .62, scanline: true },
  contact: { colors: ['#7C5CFF', '#22D3EE', '#F5A524'], amplitude: .9, speed: .56, yPosition: .5, particleCount: 64, opacity: .72, converge: true },
};

export const lightWaveColors: [string, string, string] = ['#9888EF', '#67BBD6', '#F2A982'];
