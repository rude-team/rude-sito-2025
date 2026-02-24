/**
 * Script di migrazione: importa i progetti da src/data/projects.json in Sanity.
 *
 * Le immagini (videoThumb e gallery) vengono scaricate dagli URL remoti
 * e caricate come asset nel dataset Sanity.
 *
 * Uso:
 *   node scripts/migrate-data.mjs
 *
 * Richiede le variabili d'ambiente nel file .env:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN  (token con permessi di scrittura)
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Carica le variabili d'ambiente da .env manualmente (senza dotenv)
import { readFileSync as rf } from 'fs';
function loadEnv() {
  try {
    const envPath = join(dirname(fileURLToPath(import.meta.url)), '..', '.env');
    const lines = rf(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    }
  } catch {
    // .env non trovato, si usano le variabili già presenti nell'ambiente
  }
}
loadEnv();

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const API_TOKEN = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID) {
  console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID non impostato.');
  process.exit(1);
}
if (!API_TOKEN) {
  console.error('❌  SANITY_API_TOKEN non impostato. Crea un token con permessi di scrittura su https://sanity.io/manage');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2026-02-24',
  token: API_TOKEN,
  useCdn: false,
});

// Legge il file JSON
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'src', 'data', 'projects.json');
const { projects } = JSON.parse(readFileSync(dataPath, 'utf-8'));

/**
 * Scarica un'immagine da URL e la carica come asset Sanity.
 * Restituisce il riferimento all'asset o null se l'URL è vuoto.
 */
async function uploadImageFromUrl(url) {
  if (!url || url.trim() === '') return null;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`  ⚠️  Impossibile scaricare: ${url} (${response.status})`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const uint8 = new Uint8Array(buffer);

    // Determina l'estensione dal content-type o dall'URL
    const contentType = response.headers.get('content-type') ?? 'image/jpeg';
    const ext = url.split('.').pop()?.split('?')[0] ?? 'jpg';

    const asset = await client.assets.upload('image', Buffer.from(uint8), {
      contentType,
      filename: url.split('/').pop()?.split('?')[0] ?? `image.${ext}`,
    });

    console.log(`  ✅  Caricata: ${url.split('/').pop()}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.warn(`  ⚠️  Errore upload ${url}:`, err.message);
    return null;
  }
}

async function migrateProject(project) {
  console.log(`\n📦  Migrazione: "${project.title}" (id: ${project.id})`);

  // Upload videoThumb
  let videoThumb = undefined;
  if (project.videoThumb) {
    console.log('  → Upload videoThumb...');
    videoThumb = await uploadImageFromUrl(project.videoThumb);
  }

  // Upload gallery (filtra URL vuoti)
  const galleryUrls = (project.gallery ?? []).filter((u) => u && u.trim() !== '');
  const gallery = [];
  if (galleryUrls.length > 0) {
    console.log(`  → Upload gallery (${galleryUrls.length} immagini)...`);
    for (const url of galleryUrls) {
      const img = await uploadImageFromUrl(url);
      if (img) gallery.push({ ...img, _key: crypto.randomUUID() });
    }
  }

  const doc = {
    _type: 'project',
    title: project.title,
    slug: { _type: 'slug', current: project.slug },
    client: project.client ?? '',
    category: project.category ?? '',
    year: project.year ?? '',
    longDescription: project.longDescription ?? '',
    video: project.video || undefined,
    active: project.active !== false, // default true se non specificato
    legacyId: project.id,
    ...(videoThumb ? { videoThumb } : {}),
    ...(gallery.length > 0 ? { gallery } : {}),
    ...(project.tags?.length ? { tags: project.tags } : {}),
  };

  // Usa legacyId come parte dell'_id per evitare duplicati in caso di re-run
  const docId = `project-legacy-${project.id}`;

  await client.createOrReplace({ ...doc, _id: docId });
  console.log(`  ✅  Documento creato/aggiornato: ${docId}`);
}

async function main() {
  console.log(`🚀  Avvio migrazione verso Sanity (project: ${PROJECT_ID}, dataset: ${DATASET})`);
  console.log(`📋  Progetti da migrare: ${projects.length}\n`);

  for (const project of projects) {
    await migrateProject(project);
  }

  console.log('\n🎉  Migrazione completata!');
  console.log('   Vai su http://localhost:3000/studio per verificare i dati.');
}

main().catch((err) => {
  console.error('❌  Errore fatale:', err);
  process.exit(1);
});
