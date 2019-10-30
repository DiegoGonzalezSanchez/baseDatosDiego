customElements.define("mi-footer", class extends HTMLElement {
  connectedCallback() {
    this.innerText = "Copyright © 2019 González Sánchez Diego   Grupo IC 51M.";
  }
}, { extends: "footer" });