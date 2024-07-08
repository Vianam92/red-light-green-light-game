import { greenLightDuration } from "../usecase/usecase";
import { LitElement, html, css } from "lit-element";
import { UserData, globalState } from "../service/global.state";
import "../components/header";
import "../components/semáforo.component";
import huella from "../assets/huella.png";

export class GameUI extends LitElement {
  static styles = css`
    :host {
      padding: 16px;
    }
    .container-game {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .section-game {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        justify-content: space-between;
        align-items: center;
        max-width: 700px;
        width: 100%;
        div {
          display:flex;
          column-gap:2rem;
          img {
            height: 100px;
            width: 100px;
            font-size: 1.2rem;
          }
        }
      }
    }
  `;

  static properties = {
    lightClass: { type: String },
  };

  userData: UserData[];
  lightClass: string;
  userName: string | undefined;
  user: UserData | undefined;
  score: number;
  maxPoints: number;
  lastButtonPressed: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();

    this.userName = globalState.getUser();

    const userExist = globalState
      .getUserData()
      .some((user) => user.username === this.userName);

    if (!userExist) {
      globalState.setUserData([
        {
          username: this.userName,
          score: 0,
          maxPoints: 0,
        },
      ]);
    }

    this.user = globalState
      .getUserData()
      .find((x) => x.username === this.userName);

    if (this.user) {
      this.score = this.user.score ?? 0;
      this.maxPoints = this.user.maxPoints ?? 0;
    }

    this.changeLight();
  }

  constructor() {
    super();
    this.userData = globalState.getUserData();
    this.lightClass = "red";
    this.score = 0;
    this.maxPoints = 0;
  }

  changeLight() {
    if (this.user) {
      
      if (this.lightClass === "red") {
        this.lightClass = "green";
        setTimeout(() => this.changeLight(), greenLightDuration(this.score));
      } else {
        this.lightClass = "red";
        setTimeout(() => this.changeLight(), 3000);
      }
    }
  }

  incrementPoints(button: string) {
    if (this.lightClass === "red") {
      this.score = 0;
    } else {
      if (this.lastButtonPressed === button) {
        this.score -= 1;
      } else {
        this.score += 1;
      }
    }
    this.lastButtonPressed = button;
    this.user = { ...this.user, score: this.score, maxPoints: this.score };

    this.requestUpdate();
  }

  render() {
    return html`
      <header-component
        .user=${this.user}
        .score=${this.score}
      ></header-component>
      <main class="container-game">
        <section class="section-game">
          <div>
            <semaforo-component
              .lightClass=${this.lightClass}
            ></semaforo-component>
          </div>
          <div>
            <img
              src=${huella}
              title=""
              @click=${() => this.incrementPoints("left")}
            />

            <img
              src=${huella}
              title=""
              @click=${() => this.incrementPoints("right")}
            />
          </div>
        </section>
      </main>
    `;
  }
}

customElements.define("game-ui", GameUI);
