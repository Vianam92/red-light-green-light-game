import { Router } from "@vaadin/router";
import { LitElement, html, css } from "lit";
import { ls } from "../usecase/localStorage";

export class FormComp extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;
  userName: string;
  disabled: boolean;

  static get properties() {
    return {
      username: { type: String },
      disabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.userName = "";
    this.disabled = true;
  }

  navigate() {
    Router.go("/game");
  }

  handlerChange(e: InputEvent) {
    const target = e.target as HTMLInputElement | null;
    if (target && target instanceof HTMLInputElement) {
      this.userName = target.value;
    }
    ls(this.userName);
    this.disabled = false;
  }

  render() {
    return html`
      <form>
        <label for="player">
          Nombre <small>*</small>
          <input
            type="text"
            name="player"
            id="player"
            @change=${this.handlerChange}
          />
        </label>
        <button @click=${this.navigate} ?disabled=${this.disabled}>
          Unirse
        </button>
      </form>
    `;
  }
}

customElements.define("form-register", FormComp);
