if (this.customElements) {
  try {
    // detecta browsers que no extienden elementos built-in
    customElements.define('built-in', document.createElement('p').constructor,
      { 'extends': 'p' });
  } catch (_) {
    // solo WebKit or Safari
    document.write('<script src="lib/min.js"><\x2fscript>');
  }
} else {
  // solo browsers viejos
  document.write('<script src="lib/document-register-element.js"><\x2fscript>');
}
