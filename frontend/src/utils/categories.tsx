import type { ReactNode } from 'react';
import { FiMusic, FiFilm, FiSearch, FiStar, FiSettings, FiVolume2 } from 'react-icons/fi';

export const CATEGORY_ICONS: { [key: string]: ReactNode } = {
  music: <FiMusic className="w-6 h-6" />,
  entertainment: <FiFilm className="w-6 h-6" />,
  query: <FiSearch className="w-6 h-6" />,
  "common play": <FiStar className="w-6 h-6" />,
  system: <FiSettings className="w-6 h-6" />,
  audio: <FiVolume2 className="w-6 h-6" />,
};

export const CATEGORY_DESCRIPTIONS: { [key: string]: string } = {
  music: "Stream and control your favorite music from various services",
  entertainment: "Movies, shows, jokes, and fun interactive content",
  query: "Search the web, get answers, and find information quickly",
  "common play": "Popular media playback and streaming capabilities",
  system: "System controls, settings, and device management",
  audio: "Audio playback, recording, and sound control features",
};

export const getPredefinedCategories = (): string[] => {
  return Object.keys(CATEGORY_ICONS);
};

export const getCategoryIcon = (category: string): ReactNode => {
  return CATEGORY_ICONS[category.toLowerCase()] || <FiMusic className="w-6 h-6" />;
};

export const getCategoryDescription = (category: string): string => {
  return CATEGORY_DESCRIPTIONS[category.toLowerCase()] || "Explore skills in this category";
};
