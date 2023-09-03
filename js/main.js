import "../css/style.css";
import { HTMLEditor, CSSEditor, JSEditor } from "./CodeEditor";
import { UI } from "./UI";
import "boxicons";

new HTMLEditor();
new CSSEditor();
new JSEditor();
UI.init();

// When you've done this, you can dispatch transactions to change your configuration.

// document.querySelector("button").addEventListener("click", () => {
//   view.dispatch({
//     effects: themeConf.reconfigure(
//       currentLang === "js" ? theme.light : theme.dark
//     ),
//   });
// });
