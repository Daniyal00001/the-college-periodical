import DOMPurify from "isomorphic-dompurify";

export function sanitizeHTML(dirty) {
  console.log("Sanitizing HTML...");
  return DOMPurify.sanitize(dirty);
}