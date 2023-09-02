import { JsEditor, CssEditor, HtmlEditor } from "./editor";

function updateOutput() {
  output.srcdoc = `
      <html>
        <head>
          <style>${CssEditor.code}</style>
        </head>
        <body>
          ${HtmlEditor.code}
          <script>${JsEditor.code}</script>
        </body>
      </html>
    `;
}

export { updateOutput };
