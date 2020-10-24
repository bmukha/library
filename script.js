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
  myLibrary.forEach((item, index) => {
    let newEl = document.createElement("div");
    newEl.data = index;
    newEl.innerHTML =
      `<div class="cardElement" id="cardIndex" data="${index}">Index: ${index + 1}</div> <div class="cardElement" id="cardTitle">Title: ${item.title}</div> <div class="cardElement" id="cardAuthor">Author: ${item.author}</div> <div class="cardElement" id="cardPages">Pages: ${item.pages}</div> <div class="cardElement" id="cardRead">Status: ${item.isRead ? "is read" : "not read yet"}</div> <button id="deleteBtn">DELETE</button>`;
    shelf.appendChild(newEl);
  });
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  console.table(myLibrary);
  exposeShelf();
}

shelf.addEventListener('click', (e) => {
  console.log(e.target.parentNode.data );
  e.stopPropagation();
  if (e.target.parentNode.data !== undefined) {
    deleteBook(e.target.parentNode.data);
  }
});


exposeShelf();
