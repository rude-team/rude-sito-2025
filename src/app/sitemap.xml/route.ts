import { NextResponse } from 'next/server'
import projectsData from '@/data/projects.json'

export async function GET() {
  const baseUrl = 'https://rude.team'
  const currentDate = new Date().toISOString()

  // Pagine statiche
  const staticPages = [
    {
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '1.0',
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      loc: `${baseUrl}/work`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9',
    },
  ]

  // Pagine dinamiche dei progetti (solo quelli attivi)
  const projectPages = projectsData.projects
    .filter((project: { active?: boolean }) => project.active !== false)
    .map((project: { slug: string }) => ({
      loc: `${baseUrl}/work/${project.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7',
    }))

  const allPages = [...staticPages, ...projectPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  })
}
