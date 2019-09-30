module.exports = {
  htmlSnippetStart: function() {
    return '<pre>' + '<code class="language-html">' + '<script type="prism-html-markup">';
  },

  htmlSnippetEnd: function() {
    return '</script></code></pre>';
  },
}