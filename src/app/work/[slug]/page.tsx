import { notFound } from 'next/navigation'
import Link from 'next/link'
import projectsData from '@/data/projects.json'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projects } = projectsData
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start text-center px-4 pt-8">
      <div className="max-w-4xl w-full">
        <Link 
          href="/work" 
          className="inline-block mb-8 text-gray-600 hover:text-black transition-colors"
        >
          ← Back to Work
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
        
        <p className="text-lg md:text-xl mb-8">{project.client}</p>
        
        <div className="text-left">
          <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
        </div>
      </div>
    </main>
  )
}

// Generate static params for all projects
export async function generateStaticParams() {
  const { projects } = projectsData
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}
