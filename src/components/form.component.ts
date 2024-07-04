import { Router } from "@vaadin/router";
import { LitElement, html, css } from "lit";
import { ls } from "../service/localStorage";
import { globalState } from "../service/global.state";

export class FormComp extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width:100%;
    }
    form {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      width: 100%;
      label {
        display: flex;
        flex-direction: column;
        row-gap:0.5rem;
       padding-left:0.3rem;
       color:white;
        input {
          height: 25px;
          border: none;
          border-radius: 8px;
          padding-left:10px;
        }
      }
      div{
        width:100%;
        display:flex;
        justify-content:center;
        button{
        height:25px;
        border-radius:8px;
        border:none;
        width:150px;
        color:black;
      }
      }
     
    }
  `;
  userName: string;
  disabled: boolean;
  globalState: any;

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
    this.globalState = globalState;
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
    this.globalState.setUser(this.userName);
    this.disabled = false;
  }

  render() {
    return html`
      <form>
        <label for="player">
          Nombre *
          <input
            type="text"
            name="player"
            id="player"
            @change=${this.handlerChange}
          />
        </label>
        <div>
        <button @click=${this.navigate} ?disabled=${this.disabled}>
          Unirse
        </button></div>
      </form>
    `;
  }
}

customElements.define("form-register", FormComp);
