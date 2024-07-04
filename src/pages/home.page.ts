import { LitElement, html, css } from "lit-element";
import "../components/form.component";
import semaforo from "../assets/semaforo (1).png";

export class HomeGame extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;

      article {
        display:flex;
        row-gap: 1rem;
        flex-direction:column;
        align-items:center;
        background-color: #064d5fea;
        padding:2rem;
        color:white;
        border-radius:8px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        img{
          width:80px;
          height:80px;
        }
        .title {
          padding: 14px 0;
          margin: 0;
        }
      }
    }
  `;

  render() {
    return html`
      <article>
        <img src=${semaforo} title=""/>
        <h1 class="title">Crea un nuevo jugador</h1>
        <form-register></form-register>
      </article>
    `;
  }
}

customElements.define("home-page", HomeGame);
