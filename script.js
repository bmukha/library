let myLibrary = JSON.parse(localStorage.getItem("myLib"))[0].title
  ? JSON.parse(localStorage.getItem("myLib"))
  : [];
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
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
}

function exposeShelf() {
  shelf.innerHTML = "";
  myLibrary.forEach((item, index) => {
    let newEl = document.createElement("div");
    newEl.data = index;
    newEl.innerHTML = `<div class="cardElement" id="cardIndex" data="${index}">Index: ${
      index + 1
    }</div> <div class="cardElement" id="cardTitle">Title: ${
      item.title
    }</div> <div class="cardElement" id="cardAuthor">Author: ${
      item.author
    }</div> <div class="cardElement" id="cardPages">Pages: ${
      item.pages
    }</div> <div class="cardElement" id="cardRead">Status: ${
      item.isRead ? "is read" : "not read yet"
    }</div> <button id="deleteBtn">DELETE</button> <button id="changeStatusBtn">CHANGE STATUS</button>`;
    shelf.appendChild(newEl);
  });
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  localStorage.setItem("myLib", JSON.stringify(myLibrary));
  exposeShelf();
}

shelf.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.id === "deleteBtn") {
    deleteBook(e.target.parentNode.data);
  }
  if (e.target.id === "changeStatusBtn") {
    shelf.innerHTML = "";
    myLibrary[e.target.parentNode.data].isRead = !myLibrary[
      e.target.parentNode.data
    ].isRead;
    localStorage.setItem("myLib", JSON.stringify(myLibrary));
    exposeShelf();
  }
});

exposeShelf();
