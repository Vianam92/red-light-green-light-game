import { LitElement, html, css } from "lit-element";
import "../components/form.component";
import semaforo from "../assets/semaforo (1).png";

export class HomeGame extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      section {
        padding-top: 100px;
        width: 100%;
        text-align: center;
        img {
          width: 160px;
          height: 160px;
        }
      }

      article {
        display: flex;
        row-gap: 2rem;
        flex-direction: column;
        align-items: center;
        background-color: #064d5fea;
        padding: 2rem;
        color: white;
        border-radius: 8px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        width:310px;
        max-width:400px;

        .title {
          padding: 14px 0;
          margin: 0;
        }
      }
      p{
        padding:16px;
        width:100%;
        max-width:332px;
        margin:0;
      }
    }
  `;
  instructions: boolean;

  static get properties() {
    return {
      instructions: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.instructions = false;
  }

  render() {
    return html`
      <section>
        <img src=${semaforo} title="Semáforo" />
      </section>
      <article>
        <h1 class="title">Crea un nuevo jugador</h1>
        <form-register
          .instructions=${this.instructions}
          @notify=${(e: any) => {
            this.instructions = e.detail;
          }}
        ></form-register>
      </article>
      ${this.instructions
        ? html`
            <p>
              Una vez que te registres y te unas el semáforo se pondrá en verde,
              para aumentar el score debes dar click a los pies pero variando ya
              que si tocas dos veces el mismo se te restará un punto. Si el
              semáforo cambia a rojo y tocas los pies el score se te pondrá en
              0. Buena Suerte.
            </p>
          `
        : html``}
    `;
  }
}

customElements.define("home-page", HomeGame);
