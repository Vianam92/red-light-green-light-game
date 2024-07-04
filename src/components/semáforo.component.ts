import { LitElement, html, css } from "lit-element";
import "../ui/game.ui";
import iconRed from "../assets/luz-roja.png";
import iconGreen from "../assets/semaforo.png";

export class SemaforoComponent extends LitElement {
  static styles = css`
    :host {
      padding: 16px;
      width: 100%;
    }
    .semaforo {
      width: 10rem;
    }
  `;

  static properties = {
    lightClass: { type: String },
  };

  lightClass: string;

  constructor() {
    super();
    this.lightClass = "red";
  }

  render() {
    return html`
      <img
        src="${this.lightClass === "red" ? iconRed : iconGreen}"
        title="Icono descargado de flaticon By AbtoCreative"
        class="semaforo"
      />
    `;
  }
}

customElements.define("semaforo-component", SemaforoComponent);
