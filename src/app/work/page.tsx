import projectsData from '@/data/projects.json'
import ProjectSlider from '@/app/components/ProjectSlider'
import ProjectMobileList from '@/app/components/ProjectMobileList'

export default function Work() {
  const { projects } = projectsData

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-8">
      <div className="max-w-[90rem] w-full">
        {/* Spazio per mantenere la distanza dalla navbar */}
        <div className="mb-12"></div>
        
        {/* Versione desktop */}
        <div className="hidden md:block">
          <ProjectSlider projects={projects} />
        </div>
        
        {/* Versione mobile */}
        <ProjectMobileList projects={projects} />
      </div>
    </main>
  )
}
