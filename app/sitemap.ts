import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE.url,                    lastModified: now, changeFrequency: 'monthly', priority: 1    },
    { url: `${SITE.url}/mariages`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${SITE.url}/soirees`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${SITE.url}/espaces`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8  },
    { url: `${SITE.url}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
  ]
}
