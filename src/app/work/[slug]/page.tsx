import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import ProjectGallery from '@/app/components/ProjectGallery'
import VideoPlayer from '@/app/components/VideoPlayer'
import { getAllWorkIds, getWorkById } from '@/sanity/queries'

export const revalidate = 60

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const work = await getWorkById(slug)

  if (!work) {
    notFound()
  }

  const clientNames = work.client?.map((c) => c.name).join(', ') ?? ''
  const galleryImages = (work.gallery ?? []).filter((item) => item.image)

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start text-center px-4 pt-8">
      <div className="max-w-[90rem] w-full">
        {/* Nome del progetto */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{work.title}</h1>

        {/* Nome del cliente */}
        {clientNames && (
          <p className="text-xl md:text-2xl mb-6">{clientNames}</p>
        )}

        {/* Descrizione (Portable Text) */}
        {work.description?.length > 0 && (
          <div className="text-gray-700 leading-relaxed mb-12 max-w-3xl mx-auto text-left md:text-center [&_p]:mb-4">
            <PortableText value={work.description} />
          </div>
        )}

        {/* Video player */}
        <div className="w-full mb-12">
          <VideoPlayer
            videoUrl={work.video?.url ?? ''}
            videoThumb={work.video?.poster}
          />
        </div>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <ProjectGallery images={galleryImages} />
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

export async function generateStaticParams() {
  const ids = await getAllWorkIds()
  return ids.map((id) => ({ slug: id }))
}
