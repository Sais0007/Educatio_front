import React, { useState } from 'react';
import { CourseCard } from '../cards/CourseCard';
import { CourseDetailModal } from '../modals/CourseDetailModal';
import { COURSES } from '../../data/mockData';
import { CatalogCourse } from '../../types';

interface CourseShowcaseProps {
  onEnrolCourse: (courseId: string) => void;
}

export const CourseShowcase: React.FC<CourseShowcaseProps> = ({ onEnrolCourse }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<CatalogCourse | null>(null);

  const categories = [
    { id: 'all', label: 'All Batches' },
    { id: 'physics', label: 'Physics Mastery' },
    { id: 'chemistry', label: 'Chemistry Foundation' },
    { id: 'mathematics', label: 'Advanced Mathematics' },
  ];

  const filteredCourses =
    activeCategory === 'all'
      ? COURSES
      : COURSES.filter((c) => c.category === activeCategory);

  return (
    <section id="courses-section" className="w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">
            Academic Programs
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight font-normal">
            Featured Courses &amp; Deep Batches
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-lg leading-relaxed">
            Systematic year-long programs structured by master mentors. Complete lecture derivations, daily problem sets, and milestone assessments.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary-container text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnrol={onEnrolCourse}
            onViewDetails={(c) => setSelectedCourse(c)}
          />
        ))}
      </div>

      {/* Center Footer CTA */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold transition-colors duration-150 border border-outline-variant/30"
        >
          <span>Browse All Courses &amp; Syllabi (24 Programs)</span>
          <span className="material-symbols-outlined text-[18px]">east</span>
        </button>
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnrol={onEnrolCourse}
      />
    </section>
  );
};
