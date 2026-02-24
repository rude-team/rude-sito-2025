import { client } from './client';
import type { Work } from '@/types/sanity';

/**
 * Proiezione GROQ riutilizzabile per un documento `work`.
 * Risolve le reference di `client`.
 * Usa `_id` come identificatore di route (i documenti non hanno slug).
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

/**
 * Recupera i work nell'ordine definito nel CMS tramite il documento singleton `workPage`.
 * Il campo `items` contiene un array di reference ai work nell'ordine visuale corretto.
 */
export async function getOrderedWorks(): Promise<Work[]> {
  const results = await client.fetch<Work[] | null>(
    `*[_type == "workPage"][0].items[]-> ${WORK_PROJECTION}`,
    {},
    { next: { revalidate: 60 } }
  );
  return results ?? [];
}

/** Recupera un singolo work tramite il suo `_id`. */
export async function getWorkById(id: string): Promise<Work | null> {
  return client.fetch<Work | null>(
    `*[_type == "work" && _id == $id][0] ${WORK_PROJECTION}`,
    { id },
    { next: { revalidate: 60 } }
  );
}

/**
 * Recupera gli _id di tutti i work nell'ordine definito da workPage.
 * Usato da generateStaticParams per pre-renderizzare le pagine di dettaglio.
 */
export async function getAllWorkIds(): Promise<string[]> {
  const results = await client.fetch<{ _id: string }[] | null>(
    `*[_type == "workPage"][0].items[]->{ _id }`,
    {},
    { next: { revalidate: 60 } }
  );
  return (results ?? []).map((r) => r._id);
}
