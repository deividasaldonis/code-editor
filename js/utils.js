function setIframeContent({ html, css, js }) {
  output.srcdoc = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
}

export { setIframeContent };
