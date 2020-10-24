let myLibrary = [];
const shelf = document.querySelector("#shelf");
const addBook = document.querySelector("#addButton");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const newBookBtn = document.querySelector("#newBook");
const menu = document.querySelector("#menu");
const form = document.querySelector("#form");

newBookBtn.addEventListener("click", () => {
  menu.style.display = "block";
});

form.addEventListener("submit", (e) => {
  addBookToLibrary(title.value, author.value, pages.value, read.checked);
  console.table(myLibrary);
  console.log(read);
  exposeShelf();
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;

  menu.style.display = "none";
  e.preventDefault();
});

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = () =>
    `"${this.title}" by ${this.author}, ${this.pages} pages, ${
      this.isRead ? "is read" : "not read yet"
    }.`;
}

function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead));
}

function exposeShelf() {
  shelf.innerHTML = "";
  myLibrary.forEach((item) => {
    let newEl = document.createElement("div");
    newEl.textContent = item.info();
    shelf.appendChild(newEl);
  });
}

exposeShelf();
