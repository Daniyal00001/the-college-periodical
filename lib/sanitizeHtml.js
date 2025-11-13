import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

export function sanitizeHTML(dirty) {
    console.log("Sanitizing HTML........................................................................................................................................................................................................");
    console.log("Dirty HTML:", dirty);
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(dirty);
}
