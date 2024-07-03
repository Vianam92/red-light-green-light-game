import { LitElement, html, css } from "lit-element";
import "../ui/game.ui";

export class SemaforoComponent extends LitElement {
  static styles = css`
    :host {
      padding: 16px;
      width: 100%;
    }
    .semaforo {
      font-size: 2rem;
      font-weight: 600;
    }
    .semaforo.red {
      color: red;
    }
    .semaforo.green {
      color: green;
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

  updated(changedProperties: { has: (arg0: string) => any }) {
    if (changedProperties.has("lightClass")) {
      this.requestUpdate();
    }
  }

  render() {
    return html` <p class="${`semaforo ${this.lightClass}`}">Semáforo</p> `;
  }
}

customElements.define("semaforo-component", SemaforoComponent);
