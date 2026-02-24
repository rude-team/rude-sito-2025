import ProjectSlider from '@/app/components/ProjectSlider'
import ProjectMobileList from '@/app/components/ProjectMobileList'
import { getAllWorks } from '@/sanity/queries'

export const revalidate = 60

export default async function Work() {
  const works = await getAllWorks()

  return (
    <main className="min-h-screen md:h-screen w-full flex flex-col items-center justify-start md:justify-center px-4 pt-8 md:pt-0 pb-0 md:pb-24">
      <div className="max-w-[90rem] w-full md:flex-1 md:flex md:flex-col md:justify-center">
        {/* Spazio per mantenere la distanza dalla navbar (solo mobile) */}
        <div className="mb-12 md:hidden"></div>

        {/* Versione desktop */}
        <div className="hidden md:block -mt-16">
          <ProjectSlider projects={works} />
        </div>

        {/* Versione mobile */}
        <ProjectMobileList projects={works} />
      </div>
    </main>
  )
}
