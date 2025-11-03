'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: number
  slug: string
  title: string
  client: string
  image?: string
}

interface ProjectMobileListProps {
  projects: Project[]
}

export default function ProjectMobileList({ projects }: ProjectMobileListProps) {
  const [visibleCount, setVisibleCount] = useState(6)
  const projectsPerLoad = 6

  const handleShowMore = () => {
    setVisibleCount(prev => prev + projectsPerLoad)
  }

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  return (
    <div className="md:hidden">
      <div className={`space-y-8 ${!hasMore ? 'pb-16' : ''}`}>
        {visibleProjects.map((project) => (
          <Link 
            key={project.id} 
            href={`/work/${project.slug}`}
            className="block group"
          >
            {/* Immagine 16:9 */}
            <div className="w-full aspect-video bg-gray-100 relative overflow-hidden mb-4">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {project.title}
                </div>
              )}
            </div>
            
            {/* Nome del progetto */}
            <h3 className="text-xl font-bold mb-2 group-hover:underline">
              {project.title}
            </h3>
            
            {/* Nome del cliente */}
            <p className="text-gray-600">
              {project.client}
            </p>
          </Link>
        ))}
      </div>

      {/* Pulsante "Mostra di più" */}
      {hasMore && (
        <div className="mt-8 mb-16 text-center">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 border border-black font-bold hover:bg-black hover:text-white transition-all duration-200"
          >
            Mostra di più
          </button>
        </div>
      )}
    </div>
  )
}
