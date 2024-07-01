import { LitElement, html, css } from "lit-element";
import "../components/form.component";

export class HomeGame extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: lightgray;
    }
  `;

  render() {
    return html`
      <h1>Crea un nuevo jugador</h1>
      <form-register></form-register>
    `;
  }
}

customElements.define("home-page", HomeGame);
