import { code } from "./CodeEditor";

const editors = Array.from(document.querySelectorAll(".editor"));
const topnav = document.querySelector(".topnav");
const output = document.querySelector(".output");

export class UI {
  static setEditor(e) {
    const buttons = Array.from(e.currentTarget.children);
    const currentBtn = e.target;
    const prevBtn = buttons.find((btn) => btn.classList.contains("current"));

    if (prevBtn === currentBtn) return;
    prevBtn.classList.remove("current");
    currentBtn.classList.add("current");
    const currentLang = currentBtn.dataset.lang;

    const prevEditor = editors.find((e) => e.classList.contains("current"));
    const currentEditor = editors.find((e) => e.dataset.name === currentLang);
    prevEditor.classList.remove("current");
    currentEditor.classList.add("current");
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
}
