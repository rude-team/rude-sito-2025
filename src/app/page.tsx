import { getHomePage } from '@/sanity/queries'
import { urlFor } from '@/sanity/client'
import HomeClient from './components/HomeClient'

// Cache gestita via revalidateTag("sanity") dal webhook Sanity.
export const revalidate = false

export default async function Home() {
  const homePage = await getHomePage()

  // Costruisce l'URL dell'immagine dal CDN Sanity se presente
  const imageUrl = homePage?.image
    ? urlFor(homePage.image).width(600).url()
    : null

  return (
    <HomeClient
      leftText={homePage?.leftText ?? 'forse quelli della mala'}
      rightText={homePage?.rightText?.trim() ?? 'forse la pubblicità'}
      imageUrl={imageUrl}
      videoUrl={homePage?.videoUrl ?? ''}
    />
  )
}
