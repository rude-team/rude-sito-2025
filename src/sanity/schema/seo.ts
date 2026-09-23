import { defineField, defineType } from 'sanity';

export const seoSchema = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'document',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'metaKeywords', title: 'Meta Keywords', type: 'string' }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url' }),
    defineField({ name: 'ogTitle', title: 'OG Title', type: 'string' }),
    defineField({ name: 'ogDescription', title: 'OG Description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
    defineField({ name: 'ogUrl', title: 'OG URL', type: 'url' }),
    defineField({ name: 'ogType', title: 'OG Type', type: 'string' }),
    defineField({ name: 'ogSiteName', title: 'OG Site Name', type: 'string' }),
  ],
});
