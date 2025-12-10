'use client'

import { useState, useEffect } from 'react'

interface VideoPlayerProps {
  videoUrl: string
  videoThumb?: string
}

export default function VideoPlayer({ videoUrl, videoThumb }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [vimeoVideoId, setVimeoVideoId] = useState<string | null>(null)
  const [isGoogleDrive, setIsGoogleDrive] = useState(false)
  const [googleDriveEmbedUrl, setGoogleDriveEmbedUrl] = useState<string | null>(null)

  useEffect(() => {
    // Check if it's a Vimeo URL
    const vimeoMatch = videoUrl.match(/(?:vimeo\.com\/)(?:.*\/)?(\d+)/)
    if (vimeoMatch) {
      setVimeoVideoId(vimeoMatch[1])
      setIsGoogleDrive(false)
      return
    }

    // Check if it's a Google Drive URL
    if (videoUrl.includes('drive.google.com')) {
      setIsGoogleDrive(true)
      // Extract file ID from Google Drive URL
      const driveMatch = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)
      if (driveMatch) {
        const fileId = driveMatch[1]
        // Convert to embeddable format
        setGoogleDriveEmbedUrl(`https://drive.google.com/file/d/${fileId}/preview`)
      }
      return
    }

    // If neither, assume it's a direct video URL
    setVimeoVideoId(null)
    setIsGoogleDrive(false)
  }, [videoUrl])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">Video placeholder</div>
      </div>
    )
  }

  // Vimeo player
  if (vimeoVideoId) {
    if (isPlaying) {
      return (
        <div className="w-full aspect-video bg-black relative">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video player"
          />
        </div>
      )
    }

    return (
      <div className="w-full aspect-video bg-gray-100 relative overflow-hidden cursor-pointer group" onClick={handlePlay}>
        {videoThumb ? (
          <>
            <img
              src={videoThumb}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center group-hover:bg-black/90 transition-all">
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center group-hover:bg-black/90 transition-all">
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Google Drive player
  if (isGoogleDrive && googleDriveEmbedUrl) {
    if (isPlaying) {
      return (
        <div className="w-full aspect-video bg-black relative">
          <iframe
            src={googleDriveEmbedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Video player"
          />
        </div>
      )
    }

    return (
      <div className="w-full aspect-video bg-gray-100 relative overflow-hidden cursor-pointer group" onClick={handlePlay}>
        {videoThumb ? (
          <>
            <img
              src={videoThumb}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center group-hover:bg-black/90 transition-all">
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center group-hover:bg-black/90 transition-all">
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Direct video URL fallback
  if (isPlaying) {
    return (
      <div className="w-full aspect-video bg-black">
        <video
          src={videoUrl}
          poster={videoThumb}
          controls
          autoPlay
          className="w-full h-full object-contain"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  return (
    <div className="w-full aspect-video bg-gray-100 relative overflow-hidden cursor-pointer group" onClick={handlePlay}>
      {videoThumb ? (
        <>
          <img
            src={videoThumb}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center group-hover:bg-black/90 transition-all">
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-black/70 flex items-center justify-center group-hover:bg-black/90 transition-all">
            <svg
              className="w-10 h-10 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

