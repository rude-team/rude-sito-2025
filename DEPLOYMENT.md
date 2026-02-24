# Guida al Deployment

Questo progetto supporta due ambienti di deployment principali:
1. **Google Cloud Platform (Cloud Run)** - Ambiente di Produzione attuale (Branch: `main`)
2. **Vercel** - Ambiente di Staging/Migrazione (Branch: `vercel-migration`)

---

## 1. Deploy su Vercel (Staging / Migrazione)

Vercel è utilizzato per testare le nuove funzionalità e preparare la migrazione da GCP.

### Workflow
Il deployment su Vercel è automatico e basato sul branch `vercel-migration`.

1. **Sviluppo:** Crea un branch per le tue modifiche.
2. **Merge:** Fai una Pull Request verso `vercel-migration`.
3. **Deploy:** Vercel rileverà automaticamente il push su `vercel-migration` e aggiornerà l'ambiente di anteprima.

### Configurazione Vercel
- **Project Name:** `rude-sito-2025`
- **Framework Preset:** Next.js
- **Root Directory:** `./`
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Note Importanti per Vercel
- Il branch `main` è attualmente ignorato o usato solo per la produzione GCP.
- Per testare modifiche senza toccare la produzione GCP, usa sempre il branch `vercel-migration`.

---

## 2. Deploy su Google Cloud Platform (Produzione)

Questo progetto è configurato per essere deployato su Google Cloud Platform utilizzando Cloud Run.

### File di Configurazione
- `Dockerfile` - Configurazione per containerizzare l'applicazione Next.js
- `.dockerignore` - File da escludere dal container Docker
- `cloudbuild.yaml` - Configurazione per automatizzare build e deploy
- `.gcloudignore` - File da escludere durante il deploy
- `app.yaml` - Configurazione alternativa per App Engine 
- `next.config.ts` - Aggiornato per supportare l'output standalone

### Metodo A: Deploy Automatico (Cloud Build)
Ogni push sul branch **`main`** triggera automaticamente:
1. Build dell'immagine Docker
2. Push su Container Registry
3. Deploy su Cloud Run

### Metodo B: Deploy Manuale tramite gcloud CLI

```bash
# Build dell'immagine
gcloud builds submit --tag gcr.io/PROJECT_ID/rude-sito-2025

# Deploy su Cloud Run
gcloud run deploy rude-sito-2025 \
  --image gcr.io/PROJECT_ID/rude-sito-2025 \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10
```

### Variabili d'Ambiente
Se l'applicazione necessita di variabili d'ambiente:
- **Cloud Run GUI:** "Edit & Deploy New Revision" > "Variables & Secrets"
- **CLI:** Aggiungi `--set-env-vars KEY=VALUE`

### Monitoraggio GCP
- **Logs:** Cloud Run > Seleziona servizio > Logs
- **Metrics:** Cloud Run > Seleziona servizio > Metrics

---

## Troubleshooting Generale

### Build Fallita
- Verifica `package.json` per dipendenze mancanti.
- Controlla i log di build (Vercel Dashboard o Cloud Build History).

### Differenze tra Ambienti
- **GCP:** Usa un container Docker custom.
- **Vercel:** Usa l'infrastruttura serverless nativa di Next.js.
- Se un bug appare solo su GCP, controlla il `Dockerfile`.
