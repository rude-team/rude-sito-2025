import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  project: {
    id: number
    slug: string
    title: string
    description: string
    image?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
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
      <h3 className="text-xl font-bold group-hover:underline transition-all">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
    </Link>
  )
}
