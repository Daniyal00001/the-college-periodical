// lib/sanitizeHtml.js

// 1. Import linkedom's parser for a Node.js-compatible DOM
import { parseHTML } from 'linkedom'; 
// 2. Import the factory function for DOMPurify
import createDOMPurify from 'dompurify';

// 3. Create a minimal document object which DOMPurify needs
const { document } = parseHTML('<!DOCTYPE html><html><body></body></html>');

// 4. Create a DOMPurify instance bound to the linkedom window
// We pass document.defaultView, which is the window object for the created document
const DOMPurify = createDOMPurify(document.defaultView);

/**
 * Sanitizes an HTML string using DOMPurify with a Node.js-compatible DOM (linkedom).
 * @param {string} dirty - The unsanitized HTML string.
 * @returns {string} The sanitized HTML string.
 */
export function sanitizeHTML(dirty) {
  console.log("Sanitizing HTML with linkedom/dompurify...");
  // You can optionally add configuration here, e.g., { ALLOWED_TAGS: ['b', 'i', 'a'] }
  return DOMPurify.sanitize(dirty);
}