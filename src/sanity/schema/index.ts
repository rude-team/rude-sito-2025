import { aboutPageSchema } from './aboutPage';
import { homePageSchema } from './homePage';
import { videoObjectSchema, galleryImageObjectSchema, workSchema } from './work';
import { workPageSchema } from './workPage';
import { clientSchema } from './client';
import { categorySchema } from './category';
import { tagSchema } from './tag';
import { footerSocialObjectSchema, footerSchema } from './footer';
import { seoSchema } from './seo';

export const schemaTypes = [
  // Singletons
  homePageSchema,
  aboutPageSchema,
  workPageSchema,
  footerSchema,
  seoSchema,
  // Collections
  workSchema,
  clientSchema,
  categorySchema,
  tagSchema,
  // Object types (non-document)
  videoObjectSchema,
  galleryImageObjectSchema,
  footerSocialObjectSchema,
];
