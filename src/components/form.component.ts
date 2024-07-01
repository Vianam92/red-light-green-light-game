import { Router } from "@vaadin/router";
import { LitElement, html, css } from "lit";

export class FormComp extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: lightgray;
    }
  `;
  userName: string;

  constructor() {
    super();
    this.userName = "";
  }

  navigate() {
    Router.go("/game");
  }

  validateUser(e: InputEvent) {
    const inputElement = e.target as HTMLInputElement;
    console.log(inputElement.value)
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
            @change=${this.validateUser}
          />
        </label>
        <button @click=${this.navigate}>Unirse</button>
      </form>
    `;
  }
}

customElements.define("form-register", FormComp);
