import type { PortableTextBlock } from '@portabletext/types';

// ─── Primitive Sanity types ───────────────────────────────────────────────────

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// ─── Referenced document types ───────────────────────────────────────────────

/** Documento di tipo `client` nel dataset rude-site */
export interface SanityClient {
  _id: string;
  _type: 'client';
  name: string;
}

// ─── Embedded object types ────────────────────────────────────────────────────

/**
 * Oggetto video custom (`videoObject`).
 * `url` è opzionale: alcuni work hanno solo il poster senza link Vimeo.
 */
export interface VideoObject {
  _type: 'videoObject';
  url?: string;
  poster: SanityImage;
}

/**
 * Singolo elemento della galleria (`galleryImageObject`).
 */
export interface GalleryImageObject {
  _key: string;
  _type: 'galleryImageObject';
  image: SanityImage;
}

// ─── Main document type ───────────────────────────────────────────────────────

/**
 * Documento `work` così come restituito dalla query GROQ con join delle reference.
 * I campi `category`, `tags` e `slug` non sono presenti nel dataset attuale
 * ma sono tipizzati come opzionali per compatibilità futura.
 */
export interface Work {
  _id: string;
  _type: 'work';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  /** Risolto dalla query GROQ: client[]->{_id, name} */
  client: SanityClient[];
  description: PortableTextBlock[];
  cover: SanityImage;
  video?: VideoObject;
  gallery: GalleryImageObject[];
  /** Non ancora presente nel dataset, riservato per uso futuro */
  slug?: { current: string };
  category?: string;
  tags?: string[];
}
