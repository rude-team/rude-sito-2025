'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/client'
import type { GalleryImageObject } from '@/types/sanity'

interface ProjectGalleryProps {
  images: GalleryImageObject[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  // State per desktop (3 immagini per pagina)
  const [currentIndex, setCurrentIndex] = useState(0)
  const projectsPerPage = 3
  const maxIndex = Math.max(0, images.length - projectsPerPage)

  // State per mobile (1 immagine alla volta)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Funzioni per desktop
  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + projectsPerPage, maxIndex))
  }

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - projectsPerPage, 0))
  }

  // Funzioni per mobile swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1)
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1)
    }
  }

  const translateXMobile = -(currentImageIndex * 100)
  const translateXDesktop = -(currentIndex * (100 / projectsPerPage))

  return (
    <div className="relative w-full overflow-hidden">
      {/* Versione Desktop - 3 immagini */}
      <div className="hidden md:block">
        <div
          className="flex transition-transform duration-700 ease-in-out -mx-3"
          style={{
            transform: `translateX(${translateXDesktop}%)`,
          }}
        >
          {images.map((item, index) => {
            const imgUrl = item.image ? urlFor(item.image).width(800).height(450).url() : null
            return (
              <div
                key={item._key}
                className="flex-shrink-0 w-1/3 px-3"
              >
                <div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Image {index + 1}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Frecce di navigazione desktop */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`rounded-full border w-10 h-10 flex items-center justify-center transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed border-gray-400'
                : 'border-black hover:bg-black hover:[&>svg]:stroke-white'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className={`rounded-full border w-10 h-10 flex items-center justify-center transition-all ${
              currentIndex >= maxIndex
                ? 'opacity-30 cursor-not-allowed border-gray-400'
                : 'border-black hover:bg-black hover:[&>svg]:stroke-white'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Versione Mobile - 1 immagine con swipe */}
      <div 
        className="md:hidden"
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${translateXMobile}%)`,
          }}
        >
          {images.map((item, index) => {
            const imgUrl = item.image ? urlFor(item.image).width(800).height(450).url() : null
            return (
              <div
                key={item._key}
                className="flex-shrink-0 w-full"
              >
                <div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Image {index + 1}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Indicatori (pallini) mobile */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {images.map((item, index) => (
            <div
              key={item._key}
              className={`transition-all duration-300 rounded-full ${
                index === currentImageIndex
                  ? 'w-3 h-3 bg-black'
                  : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
