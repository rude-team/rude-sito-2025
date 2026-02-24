import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import type { Work } from '@/types/sanity'

interface ProjectCardProps {
  project: Work
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const coverUrl = project.cover ? urlFor(project.cover).width(800).height(450).url() : null
  const clientNames = project.client?.map((c) => c.name).join(', ') ?? ''

  return (
    <Link href={`/work/${project._id}`} className="group block">
      <div className="w-full aspect-video bg-gray-100 relative overflow-hidden mb-4">
        {coverUrl ? (
          <Image
            src={coverUrl}
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
      <h3 className="text-xl font-bold group-hover:underline transition-all">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{clientNames}</p>
    </Link>
  )
}
