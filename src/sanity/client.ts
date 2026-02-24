import { createClient, type QueryParams } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-02-24',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Wrapper attorno a `client.fetch` che inietta automaticamente il tag `"sanity"`
 * in ogni richiesta. Questo permette a `revalidateTag("sanity")` di invalidare
 * l'intera cache Sanity quando il webhook viene ricevuto.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    cache: 'force-cache',
    next: { tags: ['sanity'] },
  });
}
