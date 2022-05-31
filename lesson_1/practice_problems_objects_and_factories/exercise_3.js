function createBook(title, author) {
  return {
    title: title,
    author: author,

    getDescription() {
      return `${this.title} was written by ${author}.`;
    }
  }
}