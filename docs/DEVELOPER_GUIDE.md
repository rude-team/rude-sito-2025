# Guida per gli Sviluppatori - rude-sito-2025

Benvenuto nella documentazione tecnica del sito web di **rude | bottega creativa**.

## 🛠 Stack Tecnologico

Il progetto è costruito utilizzando tecnologie moderne per garantire performance e fluidità nelle animazioni:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguaggio:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animazioni:** [Framer Motion](https://www.framer.com/motion/)
- **Carousel:** React Slick / Slick Carousel
- **Font:** Google Fonts (Playfair Display)

## 🚀 Per Iniziare

### Prerequisiti

- Node.js (versione 20 o superiore raccomandata)
- npm

### Installazione

1. Clona il repository:
   ```bash
   git clone <repository-url>
   cd rude-sito-2025
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

Il sito sarà disponibile su `http://localhost:3000`.

## 📂 Struttura del Progetto

```
rude-sito-2025/
├── public/              # Asset statici (immagini, icone, favicon)
├── src/
│   ├── app/             # Next.js App Router (pagine e layout)
│   │   ├── components/  # Componenti React riutilizzabili
│   │   ├── layout.tsx   # Layout principale (font, metadati)
│   │   └── page.tsx     # Homepage
│   ├── data/            # Dati locali (JSON)
│   │   └── projects.json # Database dei progetti
│   └── ...
├── next.config.ts       # Configurazione Next.js
└── package.json         # Dipendenze e script
```

## 📝 Gestione dei Contenuti

Il sito non utilizza un CMS headless esterno al momento. I dati dei progetti sono gestiti localmente tramite un file JSON.

### Aggiungere o Modificare un Progetto

1. Apri il file `src/data/projects.json`.
2. Aggiungi un nuovo oggetto all'array `projects`.
3. Struttura richiesta per ogni progetto:

```json
{
  "id": 123,
  "slug": "nome-progetto",
  "title": "Titolo del Progetto",
  "longDescription": "Descrizione completa...",
  "image": "URL immagine principale (opzionale)",
  "video": "URL video Vimeo/YouTube",
  "videoThumb": "URL thumbnail video",
  "gallery": ["url1.webp", "url2.webp"],
  "category": "Communication",
  "year": "2024",
  "client": "Nome Cliente",
  "tags": ["tag1", "tag2"],
  "active": true
}
```

**Nota:** Le immagini sono ospitate su Google Cloud Storage (`storage.googleapis.com/asset_sito_rude/...`). Assicurati di caricare i nuovi asset nel bucket appropriato o usa percorsi locali in `public/` se necessario (anche se il codice attuale punta a GCS).

## 🚢 Deployment

Il progetto è configurato per essere containerizzato e deployato su Google Cloud Platform (App Engine o Cloud Run) tramite Cloud Build.

- **Dockerfile:** Definisce l'immagine per la produzione.
- **cloudbuild.yaml:** Configurazione per la CI/CD su GCP.
- **app.yaml:** Configurazione per Google App Engine.

Per creare una build di produzione locale:

```bash
npm run build
npm start
```

## 🎨 Styling e Animazioni

- **Tailwind v4:** Utilizziamo l'ultima versione di Tailwind. Le classi sono standard.
- **Framer Motion:** Utilizzato per le transizioni in entrata (es. testi che appaiono, fade-in) nella Homepage.

## 📞 Contatti Tecnici

Per problemi tecnici o dubbi sull'infrastruttura, fare riferimento al team di sviluppo interno.
