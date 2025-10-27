'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  id: number
  slug: string
  title: string
  description: string
  image?: string
}

interface ProjectSliderProps {
  projects: Project[]
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const projectsPerPage = 3
  const maxIndex = Math.max(0, projects.length - projectsPerPage)

  const goNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + projectsPerPage
      return nextIndex > projects.length ? projects.length - projectsPerPage : nextIndex
    })
  }

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - projectsPerPage, 0))
  }

  const displayedProjects = projects.slice(currentIndex, currentIndex + projectsPerPage)
  const hasNext = currentIndex + projectsPerPage < projects.length
  const hasPrev = currentIndex > 0

  return (
    <div className="relative">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-end gap-4">
        <button
          onClick={goPrev}
          disabled={!hasPrev}
          className={`px-4 py-2 font-bold transition-all ${
            hasPrev
              ? 'hover:line-through cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Previous projects"
        >
          ←
        </button>
        <button
          onClick={goNext}
          disabled={!hasNext}
          className={`px-4 py-2 font-bold transition-all ${
            hasNext
              ? 'hover:line-through cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Next projects"
        >
          →
        </button>
      </div>
    </div>
  )
}
