import { notFound } from 'next/navigation'
import Link from 'next/link'
import projectsData from '@/data/projects.json'
import ProjectGallery from '@/app/components/ProjectGallery'
import VideoPlayer from '@/app/components/VideoPlayer'

interface Project {
  id: number
  slug: string
  title: string
  longDescription: string
  image: string
  video: string
  videoThumb?: string
  gallery: string[]
  category: string
  year: string
  client: string
  tags: string[]
  active?: boolean
}

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const { projects } = projectsData
  const project = projects.find(p => p.slug === slug) as Project | undefined

  // Mostra 404 se il progetto non esiste o non è attivo
  if (!project || project.active === false) {
    notFound()
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start text-center px-4 pt-8">
      <div className="max-w-[90rem] w-full">
        {/* Nome del progetto */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h1>
        
        {/* Nome del cliente */}
        <p className="text-xl md:text-2xl mb-6">{project.client}</p>
        
        {/* Descrizione lunga */}
        <p className="text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto">
          {project.longDescription}
        </p>
        
        {/* Video player */}
        <div className="w-full mb-12">
          <VideoPlayer videoUrl={project.video || ''} videoThumb={project.videoThumb} />
        </div>
        
        {/* Gallery - nascosta per "Un Profilo Fuori dai Comuni" e "The Director's Shot" */}
        {project.slug !== 'un-profilo-fuori-dai-comuni' && project.slug !== 'the-directors-shot' && (
          <ProjectGallery images={project.gallery || []} />
        )}
        
        {/* Back to work */}
        <Link 
          href="/work" 
          className="inline-block mt-8 mb-16 text-gray-600 hover:text-black transition-colors text-left"
        >
          ← Back to work
        </Link>
      </div>
    </main>
  )
}

// Generate static params only for active projects
export async function generateStaticParams() {
  const { projects } = projectsData
  
  return projects
    .filter((project: Project) => project.active !== false)
    .map((project) => ({
      slug: project.slug,
    }))
}
