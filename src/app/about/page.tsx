import { PortableText } from '@portabletext/react'
import { getAboutPage } from '@/sanity/queries'

// Cache gestita via revalidateTag("sanity") dal webhook Sanity.
export const revalidate = false

export default async function About() {
  const about = await getAboutPage()

  // Fallback ai valori hardcoded se Sanity non risponde
  const title = about?.title ?? 'Siamo tre creativi e una businesswoman con più talenti che rimpianti.'

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 md:-mt-24">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">
          {title}
        </h1>

        {about?.body ? (
          <div className="text-base md:text-2xl leading-relaxed [&_p]:mb-2 [&_br]:block">
            <PortableText value={about.body} />
          </div>
        ) : (
          <p className="text-base md:text-2xl leading-relaxed">
            Non facciamo neuroscienze.<br />
            Vendiamo grandi idee a brand affamati di connessioni con le persone.<br />
            Siamo veloci. Freschi. Coraggiosi.<br />
            Flessibili come ballerine e audaci come insegne al neon nella notte.<br />
            E sì, ci divertiamo ancora mentre facciamo il nostro lavoro.<br />
            Siamo la giusta gang per far esplodere il tuo brand.<br />
            <br />
            ¯\_(ツ)_/¯
          </p>
        )}
      </div>
    </main>
  )
}
