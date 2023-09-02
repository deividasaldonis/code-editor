// import {
//   autocompletion,
//   closeBrackets,
//   closeBracketsKeymap,
//   completionKeymap,
// } from "@codemirror/autocomplete";
// import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
// import { javascript } from "@codemirror/lang-javascript";
// import { html } from "@codemirror/lang-html";
// import {
//   bracketMatching,
//   defaultHighlightStyle,
//   foldGutter,
//   foldKeymap,
//   indentOnInput,
//   syntaxHighlighting,
// } from "@codemirror/language";
// import { lintKeymap, lintGutter } from "@codemirror/lint";
// import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
// import { EditorState } from "@codemirror/state";
// import {
//   crosshairCursor,
//   drawSelection,
//   dropCursor,
//   EditorView,
//   highlightActiveLine,
//   highlightActiveLineGutter,
//   highlightSpecialChars,
//   keymap,
//   lineNumbers,
//   rectangularSelection,
// } from "@codemirror/view";

// import {
//   expandAbbreviation,
//   abbreviationTracker,
// } from "@emmetio/codemirror6-plugin";
// import { dracula } from "thememirror";

// const initialText = `function hello() {
//   return "Hello!";
// }`;
// const targetElement = document.querySelector("#editor");
// const output = document.getElementById("output");

// let htmlString = "<p>Hello, world!</p>";
// let cssString = "p { color: blue; }";
// let jsString = `console.log("hi")`;
// let timer = null;

// class Editor {
//   constructor() {
//     this.extensions = [
//       EditorView.updateListener.of(function (e) {
//         if (e.docChanged) {
//           clearTimeout(timer);

//           timer = setTimeout(() => {
//             setIframeContent({
//               html: htmlString,
//               css: cssString,
//               js: e.state.doc.toString(),
//             });
//           }, 500);
//         }
//       }),
//       javascript(),
//       lintGutter(),
//       lineNumbers(),
//       EditorView.lineWrapping,
//       highlightActiveLineGutter(),
//       highlightSpecialChars(),
//       history(),
//       foldGutter(),
//       drawSelection(),
//       dropCursor(),
//       EditorState.allowMultipleSelections.of(true),
//       indentOnInput(),
//       syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
//       bracketMatching(),
//       closeBrackets(),
//       autocompletion(),
//       rectangularSelection(),
//       crosshairCursor(),
//       highlightActiveLine(),
//       highlightSelectionMatches(),
//       keymap.of([
//         ...closeBracketsKeymap,
//         ...defaultKeymap,
//         ...searchKeymap,
//         ...historyKeymap,
//         ...foldKeymap,
//         ...completionKeymap,
//         ...lintKeymap,
//         // {
//         //   key: "Tab",
//         //   run: expandAbbreviation,
//         // },
//         {
//           key: "Tab",
//           preventDefault: true,
//           run: () => {
//             const cursor = view.state.selection.main.head;
//             const transaction = view.state.update({
//               changes: {
//                 from: cursor,
//                 insert: "\t",
//               },
//               // the next 2 lines will set the appropriate cursor position after inserting the new text.
//               selection: { anchor: cursor + 1 },
//               scrollIntoView: true,
//             });
//             if (transaction) {
//               view.dispatch(transaction);
//             }
//           },
//         },
//       ]),
//     ];
//   }
// }

// const view = new EditorView({
//   parent: targetElement,
//   state: EditorState.create({
//     doc: initialText,
//     extensions: [
//       dracula,
//       // abbreviationTracker(),
//     ],
//   }),
// });

import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintKeymap, lintGutter } from "@codemirror/lint";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view";

import {
  expandAbbreviation,
  abbreviationTracker,
} from "@emmetio/codemirror6-plugin";
import { dracula } from "thememirror";
import { setIframeContent } from "./utils";

const initialText = `function hello() {
    return "Hello!";
  }`;
const targetElement = document.querySelector("#editor");
const output = document.getElementById("output");

let htmlString = "<p>Hello, world!</p>";
let cssString = "p { color: blue; }";
let jsString = `console.log("hi")`;
let timer = null;

const view = new EditorView({
  parent: targetElement,
  state: EditorState.create({
    doc: initialText,
    extensions: [
      EditorView.updateListener.of(function (e) {
        if (e.docChanged) {
          clearTimeout(timer);

          timer = setTimeout(() => {
            setIframeContent({
              html: htmlString,
              css: cssString,
              js: e.state.doc.toString(),
            });
          }, 500);
        }
      }),
      javascript(),
      lintGutter(),
      lineNumbers(),
      EditorView.lineWrapping,
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        // {
        //   key: "Tab",
        //   run: expandAbbreviation,
        // },
        {
          key: "Tab",
          preventDefault: true,
          run: () => {
            const cursor = view.state.selection.main.head;
            const transaction = view.state.update({
              changes: {
                from: cursor,
                insert: "\t",
              },
              // the next 2 lines will set the appropriate cursor position after inserting the new text.
              selection: { anchor: cursor + 1 },
              scrollIntoView: true,
            });
            if (transaction) {
              view.dispatch(transaction);
            }
          },
        },
      ]),

      dracula,
      // abbreviationTracker(),
    ],
  }),
});

export { view };
