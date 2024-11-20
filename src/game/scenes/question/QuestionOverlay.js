import { Scene } from "phaser";
import { getRandomQuestion } from "../../constants";
import { getHint, checkAnswer } from "../../../chatGPT/client";

export class QuestionOverlay extends Scene {
  constructor() {
    super("QuestionOverlay");
  }

  init(data) {
    this.onClose = data.onClose;
    this.dificulty = "easy";
  }

  create() {
    const question = getRandomQuestion(this.dificulty);
    const maxWidth = this.scale.width * 0.7;

    this.overlay = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 800, 600, 0x000000, 0.95).setOrigin(0.5);

    // Question Text
    this.questionTitle = this.add
      .text(this.scale.width / 2, this.scale.height / 2 - 200, question.title, {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Question Text
    this.questionText = this.add
      .text(this.scale.width / 2, this.scale.height / 2 - 100, question.question, {
        fontSize: "18px",
        color: "#ffffff",
        wordWrap: { width: maxWidth },
        align: "center",
      })
      .setOrigin(0.5);

    this.createInputField();

    // Submit answer Button
    this.submitButton = this.add
      .text(this.scale.width / 2, this.scale.height / 2 + 220, "Submit answer", {
        fontSize: "24px",
        color: "#ff0000",
        backgroundColor: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", async () => {
        const userAnswer = document.querySelector(".answer").value;
        await checkAnswer(question.question, userAnswer, question.answer).then((response) => {
          const parsedResponse = JSON.parse(response);
          const similarity = parsedResponse.correct;
          const explanation = parsedResponse.explanation;
          alert(`Raspunsul tau este ${similarity}% corect. \n${explanation}`);
          if (this.onClose) {
            this.onClose(similarity);
          }
          this.deleteInputField();
          this.scene.stop();
        });
      });

    // Get hint Button
    this.hintButton = this.add
      .text(this.scale.width / 2, this.scale.height / 2 + 270, "Hint", {
        fontSize: "24px",
        color: "#ff0000",
        backgroundColor: "#ffffff",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => this.getHint(question.question, question.answer, this.dificulty));
  }

  createInputField() {
    const canvasBounds = this.game.canvas.getBoundingClientRect();

    this.inputField = document.createElement("input");
    this.inputField.type = "text";
    this.inputField.className = "answer";
    this.inputField.placeholder = "Introdu răspunsul aici...";
    this.inputField.style.position = "absolute";
    this.inputField.style.width = "700px";
    this.inputField.style.height = "30px";
    this.inputField.style.fontSize = "18px";
    this.inputField.style.left = `${canvasBounds.left + canvasBounds.width / 2 - 350}px`;
    this.inputField.style.top = `${canvasBounds.top + canvasBounds.height / 2 + 70}px`;
    this.inputField.style.zIndex = "1000";
    this.inputField.style.border = "none";
    this.inputField.style.outline = "none";
    this.inputField.style.background = "#000000";
    this.inputField.style.color = "#ffffff";
    this.inputField.style.padding = "5px";

    document.body.appendChild(this.inputField);
    this.inputField.focus();

    const preventPhaserInput = (event) => {
      event.stopPropagation();
    };

    this.inputField.addEventListener("keydown", preventPhaserInput);
    window.addEventListener("resize", this.updateInputFieldPosition.bind(this));
  }

  updateInputFieldPosition() {
    if (this.inputField) {
      const canvasBounds = this.game.canvas.getBoundingClientRect();
      this.inputField.style.left = `${canvasBounds.left + canvasBounds.width / 2 - 350}px`;
      this.inputField.style.top = `${canvasBounds.top + canvasBounds.height / 2 + 70}px`;
    }
  }

  deleteInputField() {
    if (this.inputField) {
      this.inputField.removeEventListener("keydown", (event) => {
        event.stopPropagation();
      });
      window.removeEventListener("resize", this.updateInputFieldPosition.bind(this));

      this.inputField.remove();
      this.inputField = null;
    }
  }

  async getHint(question, expectedAnswer, dificulty) {
    try {
      await getHint(question, expectedAnswer, dificulty).then((response) => {
        alert(response);
      });
    } catch (error) {
      alert("Error getting hint from ChatGPT");
    }
  }
}
