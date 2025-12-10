export default function About() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 md:-mt-24">
      <div className="max-w-4xl w-full mx-auto">
        {/* Versione Mobile - Titolo con a capo */}
        <h1 className="text-2xl md:hidden font-bold mb-8">
          Siamo tre creativi e una businesswoman<br />con più talenti che rimpianti.
        </h1>
        
        {/* Versione Desktop - Titolo con a capo dopo businesswoman */}
        <h1 className="hidden md:block text-4xl font-bold mb-8 text-center">
          Siamo tre creativi e una businesswoman<br />con più talenti che rimpianti.
        </h1>
        
        {/* Versione Mobile con a capo specifici */}
        <p className="text-base leading-relaxed md:hidden">
          Non facciamo neuroscienze.<br />
          Vendiamo grandi idee a brand<br />
          affamati di connessioni vere con le persone.<br />
          Siamo veloci. Freschi. Coraggiosi.<br />
          Flessibili come ballerine e audaci<br />
          come insegne al neon nella notte.<br />
          E sì, ci divertiamo ancora<br />
          mentre facciamo il nostro lavoro.<br />
          Siamo la giusta gang<br />
          per far esplodere il tuo brand.<br />
          <br />
          ¯\_(ツ)_/¯
        </p>

        {/* Versione Desktop con a capo specifici */}
        <p className="hidden md:block text-base md:text-2xl leading-relaxed">
          Non facciamo neuroscienze.<br />
          Vendiamo grandi idee a brand affamati di connessioni con le persone.<br />
          Siamo veloci. Freschi. Coraggiosi.<br />
          Flessibili come ballerine e audaci come insegne al neon nella notte.<br />
          E sì, ci divertiamo ancora mentre facciamo il nostro lavoro.<br />
          Siamo la giusta gang per far esplodere il tuo brand.<br />
          <br />
          ¯\_(ツ)_/¯
        </p>
      </div>
    </main>
  )
}
