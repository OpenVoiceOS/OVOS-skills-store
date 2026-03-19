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

export const getPredefinedCategories = (): string[] => {
  return Object.keys(CATEGORY_ICONS);
};

export const getCategoryIcon = (category: string): ReactNode => {
  return CATEGORY_ICONS[category.toLowerCase()] || <FiMusic className="w-6 h-6" />;
};
