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
        
        <h1 className="text-4xl md:text-6xl font-bold mb-8">{project.title}</h1>
        
        <div className="text-left space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">{project.longDescription}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Client</h3>
              <p className="text-gray-700">{project.client}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Category</h3>
              <p className="text-gray-700">{project.category}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Year</h3>
              <p className="text-gray-700">{project.year}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
