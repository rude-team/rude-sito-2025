import projectsData from '@/data/projects.json'
import ProjectSlider from '@/app/components/ProjectSlider'

export default function Work() {
  const { projects } = projectsData

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-8">
      <div className="max-w-[90rem] w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">Work</h1>
        
        <ProjectSlider projects={projects} />
      </div>
    </main>
  )
}
