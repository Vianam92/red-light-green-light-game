import { LitElement, html, css } from "lit-element";
import "../ui/game.ui";
import { UserData } from "../service/global.state";

export class HeaderComponent extends LitElement {
  static styles = css`
    :host {
      padding: 16px;
      width: 100%;
    }
    header {
      display: flex;
      justify-content: space-around;
      color: #064d5fea;
      font-size:1.2rem;
    }
  `;

  static properties = {
    user: { type: Object },
  };

  user: UserData | undefined;

  render() {
    return html`
      <header>
        <p>Usuario: <span>${this.user?.username}</span></p>
        <p>Puntos: <small>${this.user?.score}</small></p>
        <p>Max de puntos: <small>${this.user?.maxPoints}</small></p>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
