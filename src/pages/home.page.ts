import { LitElement, html, css } from "lit-element";
import "../components/form.component";

export class HomeGame extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;

      article {
        background-color: #87dfd2be;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        .title {
          color: #113832;
          padding: 14px;
          margin: 0;
        }
      }
    }
  `;

  render() {
    return html`
      <article>
        <h1 class="title">Crea un nuevo jugador</h1>
        <form-register></form-register>
      </article>
    `;
  }
}

customElements.define("home-page", HomeGame);
