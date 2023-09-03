import { basicSetup, EditorView } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { githubLight } from "@ddietr/codemirror-themes/github-light";
import { githubDark } from "@ddietr/codemirror-themes/github-dark";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { UI } from "./UI";

const themeConf = new Compartment();

const theme = {
  dark: githubDark,
  light: githubLight,
};

const INITIAL_JS = `// JS code here`;
const INITIAL_CSS = `body {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height: 100vh;
  margin:0;
  font-size:1.2rem;
  font-family: "Poppins", sans-serif;
  background-color: #f5f5f5;
}

a {
  color: #191d21;
}

a:hover {
  color: #f77573;
}

svg {
  max-width:20rem;
}`;

const INITIAL_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blob</title>
  </head>
  <body>
    <p>
      <a target="_blank" href="https://blobanimation.com/">Cool site for making blobs!</a>
      <span>😀</span>
    </p>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="100%"
      id="blobSvg"
      style="opacity: 1"
      filter="blur(0px)"
      transform="rotate(1)"
    >
      <path id="blob" fill="url(#gradient)" style="opacity: 1">
        <animate
          attributeName="d"
          dur="9900ms"
          repeatCount="indefinite"
          values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;"
        ></animate>
      </path>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #f77573"></stop>
          <stop offset="100%" style="stop-color: #f77573"></stop>
        </linearGradient>
      </defs>
    </svg>
  </body>
</html>
`;

const code = {
  html: INITIAL_HTML,
  css: INITIAL_CSS,
  js: INITIAL_JS,
};

class Editor {
  constructor() {
    this.timer = null;
  }

  init() {
    this.view = new EditorView({
      parent: this.parent,
      state: EditorState.create({
        doc: this.doc,
        extensions: [
          basicSetup,
          EditorView.lineWrapping,
          EditorView.updateListener.of((view) => {
            if (view.docChanged) {
              clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                code[this.name] = view.state.doc.toString();
                UI.updateOutput();
              }, 500);
            }
          }),
          this.language,
          themeConf.of(theme.dark),
        ],
      }),
    });
  }
}

class HTMLEditor extends Editor {
  constructor() {
    super();
    this.name = "html";
    this.parent = document.querySelector(`[data-name="html"]`);
    this.doc = INITIAL_HTML;
    this.language = html();
    this.view = null;
    this.init();
  }
}

class CSSEditor extends Editor {
  constructor() {
    super();
    this.name = "css";
    this.parent = document.querySelector(`[data-name="css"]`);
    this.doc = INITIAL_CSS;
    this.language = css();
    this.view = null;
    this.init();
  }
}

class JSEditor extends Editor {
  constructor() {
    super();
    this.name = "js";
    this.parent = document.querySelector(`[data-name="js"]`);
    this.doc = INITIAL_JS;
    this.language = javascript();
    this.view = null;
    this.init();
  }
}

export { HTMLEditor, CSSEditor, JSEditor, code };
