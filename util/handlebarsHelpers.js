module.exports = {
  htmlSnippetStart: function() {
    return '<pre>' + '<code class="language-html">' + '<script type="prism-html-markup">';
  },

  htmlSnippetEnd: function() {
    return '</script></code></pre>';
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString(undefined, options);
  },

  checkedIfIncluded(collection, query) {
    if (collection.includes(query)) {
      return 'checked';
    }
  },

  selectedIfEqualObjectId(option, query) {
    if (option.equals(query)) {
      return 'selected';
    }
  }
}