# Deploy su Google Cloud Platform

Questo progetto è configurato per essere deployato su Google Cloud Platform utilizzando Cloud Run.

## File di Configurazione Creati

- `Dockerfile` - Configurazione per containerizzare l'applicazione Next.js
- `.dockerignore` - File da escludere dal container Docker
- `cloudbuild.yaml` - Configurazione per automatizzare build e deploy
- `.gcloudignore` - File da escludere durante il deploy
- `app.yaml` - Configurazione alternativa per App Engine
- `next.config.ts` - Aggiornato per supportare l'output standalone

## Metodo 1: Deploy tramite GUI di Google Cloud Console

### Prerequisiti
1. Avere un account Google Cloud Platform
2. Avere un progetto GCP attivo
3. Avere abilitato le API necessarie:
   - Cloud Run API
   - Container Registry API
   - Cloud Build API

### Passi per il Deploy

1. **Vai su Google Cloud Console**
   - Apri [console.cloud.google.com](https://console.cloud.google.com)
   - Seleziona il tuo progetto

2. **Abilita le API necessarie**
   - Vai su "APIs & Services" > "Library"
   - Cerca e abilita:
     - Cloud Run API
     - Container Registry API
     - Cloud Build API

3. **Connetti il Repository GitHub**
   - Vai su "Cloud Build" > "Triggers"
   - Clicca "Create Trigger"
   - Connetti il tuo repository GitHub
   - Configura il trigger per buildare automaticamente

4. **Deploy su Cloud Run**
   - Vai su "Cloud Run"
   - Clicca "Create Service"
   - Scegli "Deploy one revision from an existing container image"
   - Seleziona l'immagine buildata da Cloud Build
   - Configura il servizio:
     - Nome: `rude-sito-2025`
     - Regione: `europe-west1` (o la tua regione preferita)
     - Porta: `3000`
     - Memoria: `512 Mi`
     - CPU: `1`
     - Max istanze: `10`
     - Allow unauthenticated: `Yes`

## Metodo 2: Deploy tramite Cloud Build (Automatico)

Se hai configurato il trigger di Cloud Build, ogni push sul branch principale triggererà automaticamente:
1. Build dell'immagine Docker
2. Push su Container Registry
3. Deploy su Cloud Run

## Metodo 3: Deploy Manuale tramite gcloud CLI

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

## Variabili d'Ambiente

Se la tua applicazione necessita di variabili d'ambiente, puoi configurarle:
- Nella GUI di Cloud Run: vai su "Edit & Deploy New Revision" > "Variables & Secrets"
- Tramite gcloud: aggiungi `--set-env-vars KEY=VALUE`

## Monitoraggio

Dopo il deploy, puoi monitorare la tua applicazione:
- **Logs**: Cloud Run > Seleziona il servizio > Logs
- **Metrics**: Cloud Run > Seleziona il servizio > Metrics
- **URL**: Il servizio sarà disponibile all'URL fornito da Cloud Run

## Troubleshooting

### Problemi Comuni

1. **Build Fallisce**
   - Verifica che tutte le dipendenze siano in `package.json`
   - Controlla i log di Cloud Build

2. **Applicazione non si avvia**
   - Verifica che la porta sia configurata correttamente (3000)
   - Controlla i log del servizio Cloud Run

3. **Errore di memoria**
   - Aumenta la memoria allocata nel servizio Cloud Run

### Comandi Utili

```bash
# Visualizza i log del servizio
gcloud run services logs read rude-sito-2025 --region europe-west1

# Aggiorna il servizio
gcloud run services update rude-sito-2025 --region europe-west1

# Elimina il servizio
gcloud run services delete rude-sito-2025 --region europe-west1
```

## Costi

Cloud Run è un servizio serverless che addebita solo per il tempo di utilizzo:
- CPU e memoria solo quando il servizio è attivo
- Nessun costo quando il servizio è inattivo (0 istanze)
- Costi per storage delle immagini in Container Registry

Per stimare i costi, usa il [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator). 