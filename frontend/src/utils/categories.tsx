import type { ReactNode } from 'react';
import { FiMusic, FiFilm, FiSearch, FiStar, FiSettings, FiVolume2 } from 'react-icons/fi';

type CategoryMeta = { icon: ReactNode; description: string };
export const CATEGORY_META: Record<string, CategoryMeta> = {
  music: {
    icon: <FiMusic className="w-6 h-6" />,
    description: "Stream and control your favorite music from various services",
  },
  entertainment: {
    icon: <FiFilm className="w-6 h-6" />,
    description: "Movies, shows, jokes, and fun interactive content",
  },
  query: {
    icon: <FiSearch className="w-6 h-6" />,
    description: "Search the web, get answers, and find information quickly",
  },
  "common play": {
    icon: <FiStar className="w-6 h-6" />,
    description: "Popular media playback and streaming capabilities",
  },
  system: {
    icon: <FiSettings className="w-6 h-6" />,
    description: "System controls, settings, and device management",
  },
  audio: {
    icon: <FiVolume2 className="w-6 h-6" />,
    description: "Audio playback, recording, and sound control features",
  },
};

export const getPredefinedCategories = (): string[] => {
  return Object.keys(CATEGORY_META);
};

export const getCategoryIcon = (category: string): ReactNode => {
  return CATEGORY_META[category.toLowerCase()]?.icon || <FiMusic className="w-6 h-6" />;
};

export const getCategoryDescription = (category: string): string => {
  return CATEGORY_META[category.toLowerCase()]?.description || "Explore skills in this category";
};
