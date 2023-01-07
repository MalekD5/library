function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const BookPrototype = {
    info: function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${
            this.read ? 'you\'ve read this book!' : 'not read yet'
        }`;
    },
}

Book.prototype = BookPrototype;

let books = [new Book('The Laws of Human natureasdasdasdasdasd', 'Ribert Greene', 690, false), new Book('Atomic Habits', 'James Clear', 285, true), new Book('The psychology of Money', 'Morgan Housel', 255, true)];


const books_selector = document.querySelector('.books-container');
const modal_selector = document.querySelector('.overlay');

const form_title_selector = document.querySelector('#title');
const form_author_selector = document.querySelector('#author');
const form_pages_selector = document.querySelector('#pages');
const form_read_selector = document.querySelector('#read');

function addToLibrary(book) {
    books.push(book);
}

function clearBooks() {
    books_selector.textContent = '';
}

function constructBook(book, i) {
    const newBook = document.createElement('div');

    const title = document.createElement('h3');
    title.innerText = `${book.title}`;

    const info = document.createElement('p');
    info.innerText = `Author: ${book.author}, Number of Pages: ${book.pages}, completed: ${book.read}`;

    newBook.setAttribute('id', book.title);
    newBook.setAttribute('class', 'books-container__book');
    newBook.dataset.index = i;
    
    const btn_read = document.createElement('button');
    btn_read.innerText = 'Read';
    btn_read.onclick = () => {
        const fbook = books[newBook.dataset.index];
        fbook.read = !fbook.read;
        info.innerText = `Author: ${fbook.author}, Number of Pages: ${fbook.pages}, completed: ${fbook.read}`;
    }

    const btn_remove = document.createElement('button');
    btn_remove.innerText = "Remove";
    btn_remove.onclick = () => {
        books.splice(newBook.dataset.index, 1);
        clearBooks();
        addBooksToHTML();
    }

    newBook.appendChild(title);
    newBook.appendChild(info);
    newBook.appendChild(btn_read);
    newBook.appendChild(btn_remove);
    books_selector.appendChild(newBook);
    
}

function addBooksToHTML() {
    clearBooks();
    for (let i = 0; i < books.length; i++) {
        constructBook(books[i], i);
    }
}

function submitForm(e) {
    e.preventDefault();
}

function checkbox_fix(e) {
    e.stopImmediatePropagation();

    const checked = (e.currentTarget.checked) ? false : true;
    e.currentTarget.checked=(checked) ? false : checked.toString();
}

function handleAddBook() {
    const book = new Book(form_title_selector.value, form_author_selector.value, form_pages_selector.value, form_read_selector.checked);

    addToLibrary(book);
    addBooksToHTML();
    toggleModal();
}

function toggleModal() {
    clearModal();
    const display = modal_selector.style.display;
    modal_selector.style.display = display === 'block' ? 'none' : 'block';
}

function closeModal() {
    clearModal();
    modal_selector.style.display = 'none';
}

function clearModal() {
    form_title_selector.value = '';
    form_author_selector.value = '';
    form_read_selector.checked = false;
    form_pages_selector.value = '100';
}