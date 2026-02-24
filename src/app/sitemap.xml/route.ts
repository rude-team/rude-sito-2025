import { NextResponse } from 'next/server'
import { getAllWorkIds } from '@/sanity/queries'

// Funzione per fare l'XML escaping dei caratteri speciali
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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

  // Pagine dinamiche dei progetti da Sanity
  const workIds = await getAllWorkIds()
  const projectPages = workIds.map((id) => ({
    loc: `${baseUrl}/work/${id}`,
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
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${escapeXml(page.lastmod)}</lastmod>
    <changefreq>${escapeXml(page.changefreq)}</changefreq>
    <priority>${escapeXml(page.priority)}</priority>
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
