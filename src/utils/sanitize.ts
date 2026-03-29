// utils/sanitize.ts
import DOMPurify from 'dompurify';


export function sanitizeHTML(dirty: string): string {
  if (typeof window === 'undefined') {
    return dirty;
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h2', 'h3', 'h4'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

// Usage: replace dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
// with:  dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
// Then:  npm install dompurify @types/dompurify
