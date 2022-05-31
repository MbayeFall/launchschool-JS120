function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      if (this.read) {
        return `${this.title} was written by ${author}. I have read it.`
      } else return `${this.title} was written by ${author}. I haven't read it.` 
    },

    readBook() {
      this.read = true;
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook('Aunts aren\'t Gentlement', 'PG Wodehouse');

console.log(book1.getDescription()); // Mythos was written by David Fry. I haven't read it.
console.log(book1.readBook());
console.log(book1.getDescription()); // Mythos was written by David Fry. I have read it.