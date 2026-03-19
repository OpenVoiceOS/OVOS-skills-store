import { useState, useMemo, useEffect } from 'react';
import { useSkills } from './hooks/useSkills';
import type { Skill } from './types';
import SkillCard from './components/SkillCard';
import Header from './components/Header';
import Footer from './components/Footer';
import FeaturedSection from './components/FeaturedSection';
import SkillModal from './components/SkillModal';
import CategoriesPage from './components/CategoriesPage';
import CategoryDetailPage from './components/CategoryDetailPage';
import SubmitPage from './components/SubmitPage';
import {
  filterSkills,
  filterSkillsByCategory,
  getRandomItems,
  countSkillsByCategory,
} from './utils/skills';

function App() {
  const { skills, loading, error } = useSkills();
  const [currentPage, setCurrentPage] = useState<'home' | 'categories' | 'category-detail' | 'submit'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skillCounts = useMemo(() => countSkillsByCategory(skills), [skills]);

  // Get featured skills (5 random ones)
  const featuredSkills = useMemo(
    () => getRandomItems(skills, 5),
    [skills]
  );

  // Filter skills based on search (for home page - no category filter)
  const filteredSkills = useMemo(
    () => filterSkills(skills, searchQuery),
    [skills, searchQuery]
  );

  // Get skills for selected category
  const categorySkills = useMemo(
    () => filterSkillsByCategory(skills, selectedCategory),
    [skills, selectedCategory]
  );

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('category-detail');
    setSearchQuery('');
  };

  const handleBackToCategories = () => {
    setCurrentPage('categories');
    setSelectedCategory(null);
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header with navigation */}
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Loading skills...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded">
            <p>Error loading skills. Please try refreshing the page.</p>
          </div>
        )}

        {/* Home Page */}
        {!loading && !error && currentPage === 'home' && (
          <>
            {/* Featured Section - Only show when no search query */}
            {!searchQuery && featuredSkills.length > 0 && (
              <FeaturedSection
                skills={featuredSkills}
                onSkillClick={handleSkillClick}
              />
            )}

            {/* All Skills Grid */}
            {filteredSkills.length > 0 ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {searchQuery ? 'Search Results' : 'All Skills'} (
                    {filteredSkills.length})
                  </h2>
                  {searchQuery && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Found {filteredSkills.length} skill
                      {filteredSkills.length !== 1 ? 's' : ''} matching "
                      {searchQuery}"
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                  {filteredSkills.map((skill, index) => (
                    <SkillCard
                      key={index}
                      {...skill}
                      onClick={() => handleSkillClick(skill)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {searchQuery
                    ? `No skills found matching "${searchQuery}"`
                    : 'No skills available'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Categories Page */}
        {!loading && !error && currentPage === 'categories' && (
          <CategoriesPage
            skillCounts={skillCounts}
            onCategoryClick={handleCategoryClick}
          />
        )}

        {/* Category Detail Page */}
        {!loading && !error && currentPage === 'category-detail' && selectedCategory && (
          <CategoryDetailPage
            category={selectedCategory}
            skills={categorySkills}
            onSkillClick={handleSkillClick}
            onBack={handleBackToCategories}
          />
        )}

        {/* Submit Skill Page */}
        {currentPage === 'submit' && (
          <SubmitPage />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Skill Modal */}
      <SkillModal
        skill={selectedSkill}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
