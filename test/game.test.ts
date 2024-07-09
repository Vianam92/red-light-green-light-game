import { expect, describe, it, beforeEach } from "vitest";
import { fixture, html } from "@open-wc/testing";
import { GameUI } from "../src/ui/game.ui";
import "../src/components/header";
import "../src/components/semáforo.component";
import { HeaderComponent } from "../src/components/header";
import { SemaforoComponent } from "../src/components/semáforo.component";

if (!customElements.get("game-ui")) {
  customElements.define("game-ui", GameUI);
}

describe("GameUI", () => {
  let gameUI: GameUI;
  beforeEach(() => {
    gameUI = document.createElement("game-ui") as GameUI;
    document.body.appendChild(gameUI);
  });

  it("should render header correctly", async () => {
    const user = { username: "Luisa", score: 4, maxPoints: 4 };
    const header = await fixture(
      html`<header-component .user=${user}></header-component>`
    );
    expect(header.shadowRoot).to.exist;
    const headerComponent = header as HeaderComponent;
    expect(headerComponent.user?.username).to.deep.equal("Luisa");
    expect(headerComponent.user?.score).to.deep.equal(4);
  });

  it("should change lightClass in semaforo component", async () => {
    const light = "green";
    const componentSemaforo = (await fixture(
      html`<semaforo-component .lightClass=${light}></semaforo-component>`
    )) as SemaforoComponent;

    expect(componentSemaforo.lightClass).to.deep.equal("green");
  });

  it("should change light", async () => {
    gameUI.user = { username: "Luisa", score: 0, maxPoints: 0 };
    gameUI.changeLight();

    expect(gameUI.lightClass).toBe("green");

    gameUI.changeLight();

    expect(gameUI.lightClass).toBe("red");
  });

  describe("test increment logic", () => {
    it("should increment points when is green and rest id is the same button", () => {
      gameUI.lightClass = "green";
      gameUI.incrementPoints("left");
      expect(gameUI.score).toEqual(1);

      gameUI.incrementPoints("right");
      expect(gameUI.score).toEqual(2);

      gameUI.incrementPoints("right");
      expect(gameUI.score).toEqual(1);

      gameUI.changeLight();
      gameUI.incrementPoints("left");
      expect(gameUI.score).toEqual(0);
    });
  });
});
