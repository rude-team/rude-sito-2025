# AI Agent Guide - rude-sito-2025

Questa documentazione è ottimizzata per Agenti AI e LLM che devono comprendere, modificare o estendere il codice di questo progetto.

## 🧠 Contesto del Progetto

**rude-sito-2025** è il sito portfolio dell'agenzia creativa "rude". È un sito vetrina fortemente incentrato sull'impatto visivo, video e animazioni minimaliste ma curate.

## 🏗 Architettura Tecnica

- **Framework:** Next.js 15 (App Router).
- **Rendering:** Server Components (RSC) di default, con `use client` per componenti interattivi (es. modali, animazioni framer-motion).
- **Styling:** Tailwind CSS v4.
- **Data Source:** File JSON statico (`src/data/projects.json`). Nessun database SQL/NoSQL attivo.

## 📍 Mappa dei File Chiave

| Percorso | Descrizione |
|----------|-------------|
| `src/app/layout.tsx` | Root Layout. Contiene `ClientLayoutWrapper`, font (Playfair Display) e metadati SEO. |
| `src/app/page.tsx` | Homepage. Contiene l'animazione introduttiva (testo "forse quelli della mala...") e la griglia dei progetti (o link ad essi). |
| `src/data/projects.json` | "Database" dei progetti. Contiene array di oggetti `Project`. |
| `src/app/components/` | Componenti UI. Es. `VideoModal`, `ClientLayoutWrapper`. |
| `public/` | Asset statici locali (es. `lapide.png`, icone social). |

## 🧩 Schema Dati (Projects)

Il file `src/data/projects.json` segue questa interfaccia implicita (TypeScript):

```typescript
interface Project {
  id: number;
  slug: string;           // URL friendly identifier
  title: string;
  longDescription: string;
  image: string;          // Spesso vuota se c'è videoThumb
  video: string;          // URL Vimeo/YouTube
  videoThumb: string;     // URL immagine anteprima (spesso GCS)
  gallery: string[];      // Array di URL immagini
  category: string;       // Es: "Communication", "Installation"
  year: string;
  client: string;
  tags: string[];
  active?: boolean;       // Opzionale, se false il progetto potrebbe essere nascosto
}
```

## 💅 Convenzioni di Codice

1.  **Componenti:**
    *   Usa `export default function NomeComponente() {}`.
    *   Se usi hook (`useState`, `useEffect`) o event handler, aggiungi `'use client'` in cima al file.
    *   Interfacce delle props devono essere esplicite.

2.  **Styling (Tailwind):**
    *   Usa classi utility per tutto.
    *   Evita CSS custom in `.css` file a meno che strettamente necessario (es. animazioni complesse non gestibili da Tailwind/Framer).
    *   Il font principale è `Playfair Display` configurato in `layout.tsx`.

3.  **Animazioni:**
    *   Preferire `framer-motion` per animazioni di entrata/uscita e layout.
    *   Esempio pattern:
        ```tsx
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        ```

## ⚠️ Note Importanti per gli Agenti

- **Immagini:** Molte immagini puntano a `storage.googleapis.com`. Se devi aggiungere immagini placeholder, usa servizi come `placehold.co` o chiedi all'utente di fornire l'asset.
- **Video:** Il sito fa forte uso di video (Vimeo). Il componente `VideoModal` gestisce la riproduzione in overlay.
- **Modifiche al Contenuto:** Per modificare i testi dei progetti, non cercare nell'HTML, ma modifica `src/data/projects.json`.
