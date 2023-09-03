import { code } from "./CodeEditor";

const editorContainer = document.querySelector(".editor-container");
const editors = Array.from(document.querySelectorAll(".editor"));
const languageButtons = document.querySelector(".language-buttons");
const topnav = document.querySelector(".topnav");
const output = document.querySelector(".output");
const previewBtn = document.querySelector(".preview");

const mediaQuery = window.matchMedia("(min-width: 800px)");

export class UI {
  static setEditor(e) {
    const currentBtn = e.target.closest(".language");

    if (currentBtn.classList.contains("current")) return;
    const buttons = Array.from(languageButtons.children);
    buttons.forEach((btn) => btn.classList.remove("current"));

    currentBtn.classList.add("current");
    const currentLang = currentBtn.dataset.lang;

    editors.forEach((e) => e.classList.remove("current"));
    const currentEditor = editors.find((e) => e.dataset.name === currentLang);
    currentEditor.classList.add("current");
    previewBtn.classList.remove("current");
    editorContainer.classList.remove("hide");

    if (!mediaQuery.matches) {
      output.classList.add("hide");
    }
  }

  static adjustMainElementsHeight() {
    const { height } = topnav.getBoundingClientRect();
    document.documentElement.style.setProperty(
      "--topnav-height",
      height + "px"
    );
  }

  static updateOutput() {
    const { css, html, js } = code;

    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(html, "text/html");

    const script = document.createElement("script");
    script.textContent = js;

    const style = document.createElement("style");
    style.textContent = css;

    parsedHTML.body.insertAdjacentElement("beforeend", style);
    parsedHTML.body.insertAdjacentElement("beforeend", script);

    const htmlStr = parsedHTML.getElementsByTagName("html")[0].innerHTML;
    output.srcdoc = htmlStr;
  }

  static showPreview(e) {
    const previewButton = e.currentTarget;
    if (previewButton.classList.contains("current")) return;

    const buttons = Array.from(languageButtons.children);
    buttons.forEach((btn) => btn.classList.remove("current"));
    editors.forEach((e) => e.classList.remove("current"));

    previewButton.classList.add("current");
    editorContainer.classList.add("hide");
    output.classList.remove("hide");
  }

  static changeLayout() {
    const buttons = Array.from(languageButtons.children);

    if (mediaQuery.matches) {
      editorContainer.classList.remove("hide");
      output.classList.remove("hide");
      previewBtn.classList.remove("current");
      const activeBtn = buttons.find((btn) =>
        btn.classList.contains("current")
      );
      if (!activeBtn) {
        buttons[0].classList.add("current");
        editors[0].classList.add("current");
      }
    } else {
      buttons.forEach((btn) => btn.classList.remove("current"));
      editors.forEach((e) => e.classList.remove("current"));
      editorContainer.classList.add("hide");
      output.classList.remove("hide");
      previewBtn.classList.add("current");
    }
  }

  static init() {
    UI.changeLayout();
    UI.updateOutput();
    UI.adjustMainElementsHeight();
    previewBtn.addEventListener("click", UI.showPreview);
    languageButtons.addEventListener("click", UI.setEditor);
    window.addEventListener("resize", UI.adjustMainElementsHeight);
    mediaQuery.addEventListener("change", UI.changeLayout);
  }
}
