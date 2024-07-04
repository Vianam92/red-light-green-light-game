import { LitElement, html, css } from "lit-element";
import "../ui/game.ui";
import { UserData, globalState } from "../service/global.state";
import { Router } from "@vaadin/router";

export class HeaderComponent extends LitElement {
  static styles = css`
    :host {
      padding: 16px;
      width: 100%;
    }
    header {
      display: flex;
      column-gap: 1rem;
      justify-content: space-around;
      color: #064d5fea;
      font-size: 1.2rem;
      margin: 1rem;
      nav {
        padding: 2rem;
        width: 100%;
        background-color: #45f0899c;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
      button {
        width: 50px;
        height: 30px;
        border-radius: 8px;
        border: none;
        background-color: #064d5fea;
        color: white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
    }
  `;

  static properties = {
    user: { type: Object },
    score: { type: Number },
  };

  user: UserData | undefined;
  score: number;

  constructor() {
    super();
    this.score = 0;
  }

  saveData() {
    if (this.user) {
      this.user.score = this.score;
      this.user.maxPoints = Math.max(this.user.maxPoints ?? 0, this.score);
      globalState.setUserData([this.user]);
    }
    Router.go("/");
  }

  render() {
    return html`
      <header>
        <nav>
          <p>Usuario: <span>${this.user?.username}</span></p>
          <p>Puntos: <small>${this.user?.score}</small></p>
          <p>Max de puntos: <small>${this.user?.maxPoints}</small></p>
        </nav>
        <button @click=${() => this.saveData()}>>></button>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
