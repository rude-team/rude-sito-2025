'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'

interface Project {
  id: number
  slug: string
  title: string
  client: string
  image?: string
  videoThumb?: string
}

interface ProjectSliderProps {
  projects: Project[]
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const projectsPerPage = 3
  const maxIndex = Math.max(0, projects.length - projectsPerPage)

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + projectsPerPage, maxIndex))
  }

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - projectsPerPage, 0))
  }

  const translateX = -(currentIndex * (100 / projectsPerPage))

  return (
    <div className="relative w-full overflow-hidden">
      {/* Container orizzontale con transizione fluida */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(${translateX}%)`,
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-1/3 px-3" // 3 progetti per riga
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Frecce di navigazione */}
      <div className="flex justify-end gap-4 mt-6">
        {/* Freccia sinistra */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`rounded-full border w-10 h-10 flex items-center justify-center transition-all ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed border-gray-400'
              : 'border-black hover:bg-black hover:[&>svg]:stroke-white'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Freccia destra */}
        <button
          onClick={goNext}
          disabled={currentIndex >= maxIndex}
          className={`rounded-full border w-10 h-10 flex items-center justify-center transition-all ${
            currentIndex >= maxIndex
              ? 'opacity-30 cursor-not-allowed border-gray-400'
              : 'border-black hover:bg-black hover:[&>svg]:stroke-white'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
