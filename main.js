import "./style.css";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
// import { html } from "@codemirror/lang-html";
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
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

const initialText = `function hello() {
  return "Hello!";
}`;
const targetElement = document.querySelector("#editor");

const view = new EditorView({
  parent: targetElement,
  state: EditorState.create({
    doc: initialText,
    extensions: [
      javascript(),

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
