import { MetadataRoute } from 'next'
import projectsData from '@/data/projects.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rude.team'
  const currentDate = new Date().toISOString()

  // Pagine statiche
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Pagine dinamiche dei progetti (solo quelli attivi)
  const projectPages: MetadataRoute.Sitemap = projectsData.projects
    .filter((project: { active?: boolean }) => project.active !== false)
    .map((project: { slug: string }) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticPages, ...projectPages]
}
