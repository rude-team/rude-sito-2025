import projectsData from '@/data/projects.json'
import ProjectSlider from '@/app/components/ProjectSlider'
import ProjectMobileList from '@/app/components/ProjectMobileList'

export default function Work() {
  const { projects } = projectsData
  // Filtra solo i progetti attivi (active !== false)
  const activeProjects = projects.filter((project: any) => project.active !== false)

  return (
    <main className="min-h-screen md:h-screen w-full flex flex-col items-center justify-start md:justify-center px-4 pt-8 md:pt-0 pb-0 md:pb-24">
      <div className="max-w-[90rem] w-full md:flex-1 md:flex md:flex-col md:justify-center">
        {/* Spazio per mantenere la distanza dalla navbar (solo mobile) */}
        <div className="mb-12 md:hidden"></div>
        
        {/* Versione desktop */}
        <div className="hidden md:block -mt-16">
          <ProjectSlider projects={activeProjects} />
        </div>
        
        {/* Versione mobile */}
        <ProjectMobileList projects={activeProjects} />
      </div>
    </main>
  )
}
