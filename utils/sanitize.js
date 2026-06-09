'use strict';

const Sanitize = (() => {
  const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ENTITIES[c]);
  }

  // Strips all tags except <br> and <br />
  function allowBr(str) {
    return String(str).replace(/<(?!br\s*\/?)[^>]+>/gi, '');
  }

  // Safe innerText equivalent — strips all tags
  function stripTags(str) {
    return String(str).replace(/<[^>]+>/g, '');
  }

  // Trim, collapse whitespace, strip control characters, enforce max length
  function sanitizeText(str, maxLen = 200) {
    return String(str)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      .trim()
      .slice(0, maxLen);
  }

  return { escapeHTML, allowBr, stripTags, sanitizeText };
})();
