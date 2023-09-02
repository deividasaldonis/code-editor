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
import { dracula as editorTheme } from "thememirror";
import { updateOutput } from "./utils";

class Editor {
  constructor() {
    this.timer = null;
    this.keymapExtensions = [
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap,
      {
        key: "Tab",
        preventDefault: true,
        run: () => {
          const cursor = this.view.state.selection.main.head;
          const transaction = this.view.state.update({
            changes: {
              from: cursor,
              insert: "\t",
            },

            selection: { anchor: cursor + 1 },
            scrollIntoView: true,
          });
          if (transaction) {
            this.view.dispatch(transaction);
          }
        },
      },
    ];

    this.baseExtensions = [
      editorTheme,
      EditorView.lineWrapping,
      EditorState.allowMultipleSelections.of(true),
      lintGutter(),
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),

      keymap.of(this.keymapExtensions),

      EditorView.updateListener.of((view) => {
        if (view.docChanged) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.setCode(view.state.doc.toString());
          }, 500);
        }
      }),
    ];
  }

  getCode() {
    if (this.editor === "js") {
      return JsEditor.code;
    }
    if (this.editor === "html") {
      return HtmlEditor.code;
    }
    if (this.editor === "css") {
      return CssEditor.code;
    }
  }

  setCode(code) {
    if (this.editor === "js") {
      JsEditor.code = code;
    } else if ((this.editor = "html")) {
      HtmlEditor.code = code;
    } else if (this.editor === "css") {
      HtmlEditor.code = code;
    }

    updateOutput();
  }

  init() {
    this.view = new EditorView({
      parent: this.parent,
      state: EditorState.create({
        doc: this.getCode(),
        extensions: this.extensions,
      }),
    });

    updateOutput();
  }
}

export class HtmlEditor extends Editor {
  static code = "<p>Hello, world!</p>";

  constructor() {
    super();
    this.editor = "html";
    this.parent = document.getElementById("editor-html");

    this.keymapExtensions.unshift({
      key: "Tab",
      run: expandAbbreviation,
    });
    this.extensions = [...this.baseExtensions, html(), abbreviationTracker()];
    this.init();
  }
}

export class CssEditor extends Editor {
  static code = "p { color: blue; }";

  constructor() {
    super();
    this.editor = "css";
    this.parent = document.getElementById("editor-css");
    this.extensions = [...this.baseExtensions, javascript()];
    this.init();
  }
}

export class JsEditor extends Editor {
  static code = `console.log("hi")`;

  constructor() {
    super();
    this.editor = "js";
    this.parent = document.getElementById("editor-js");
    this.extensions = [...this.baseExtensions, javascript()];
    this.init();
  }
}
