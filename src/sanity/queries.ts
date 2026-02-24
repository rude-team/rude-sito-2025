import { client } from './client';
import type { Work } from '@/types/sanity';

/**
 * Proiezione GROQ riutilizzabile per un documento `work`.
 * Risolve le reference di `client` e normalizza gli oggetti custom.
 * Usa `_id` come identificatore di route perché i documenti non hanno slug.
 */
const WORK_PROJECTION = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  "client": client[]->{_id, _type, name},
  description,
  cover,
  video,
  gallery
}`;

/** Recupera tutti i work pubblicati, ordinati per data di creazione decrescente. */
export async function getAllWorks(): Promise<Work[]> {
  return client.fetch<Work[]>(
    `*[_type == "work"] | order(_createdAt desc) ${WORK_PROJECTION}`,
    {},
    { next: { revalidate: 60 } }
  );
}

/** Recupera un singolo work tramite il suo `_id`. */
export async function getWorkById(id: string): Promise<Work | null> {
  return client.fetch<Work | null>(
    `*[_type == "work" && _id == $id][0] ${WORK_PROJECTION}`,
    { id },
    { next: { revalidate: 60 } }
  );
}

/** Recupera solo gli _id di tutti i work (per generateStaticParams). */
export async function getAllWorkIds(): Promise<string[]> {
  const results = await client.fetch<{ _id: string }[]>(
    `*[_type == "work"]{ _id }`,
    {},
    { next: { revalidate: 60 } }
  );
  return results.map((r) => r._id);
}
