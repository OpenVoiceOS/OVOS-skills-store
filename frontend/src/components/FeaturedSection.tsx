import type { Skill } from '../types';
import FeaturedSkillCard from './FeaturedSkillCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

interface FeaturedSectionProps {
  skills: Skill[];
  onSkillClick?: (skill: Skill) => void;
}

const FeaturedSection = ({ skills, onSkillClick }: FeaturedSectionProps) => {
  if (skills.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Featured Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hand-picked skills worth exploring
        </p>
      </div>
      <div className="featured-carousel">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          className="w-full pb-4"
        >
          {skills.map((skill, index) => (
            <SwiperSlide key={index} className="h-full">
              <FeaturedSkillCard
                {...skill}
                onClick={() => onSkillClick?.(skill)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedSection;
