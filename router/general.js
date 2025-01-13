const express = require('express');
const public_users = express.Router();
let books = require("./booksdb.js");
const axios = require('axios');

// Register a new user
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
    }

    if (!isValid(username)) {  // Check if username is available
        return res.status(409).json({message: "Username already exists"});
    }

    users.push({"username": username, "password": password});
    return res.status(201).json({message: "User successfully registered", user: username});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    
    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }
    
    return res.status(200).json(book);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    const matchingBooks = Object.values(books).filter(
        book => book.author.toLowerCase().includes(author)
    );
    
    if (matchingBooks.length === 0) {
        return res.status(404).json({message: "No books found for this author"});
    }
    
    return res.status(200).json(matchingBooks);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    const matchingBooks = Object.values(books).filter(
        book => book.title.toLowerCase().includes(title)
    );
    
    if (matchingBooks.length === 0) {
        return res.status(404).json({message: "No books found with this title"});
    }
    
    return res.status(200).json(matchingBooks);
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    
    if (!book) {
        return res.status(404).json({message: "Book not found"});
    }
    
    return res.status(200).json({
        isbn: isbn,
        reviews: book.reviews || []
    });
});


// Task 10: Get the list of books available in the shop (using async/await)
async function getBooks() {
    try {
        const response = await axios.get('https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai'); // Assicurati che il server sia in esecuzione su localhost:3000
        console.log("Books fetched successfully:", response.data);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}
// Task 10: Get the list of books available in the shop (using async/await)
async function getBooks() {
    try {
        const response = await axios.get('https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai'); // Assicurati che il server sia in esecuzione su localhost:3000
        console.log("Books fetched successfully:", response.data);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Task 10: Get the list of books available in the shop (using Promise callbacks)
function getBooksWithPromises() {
    axios.get('https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai')
        .then(response => {
            console.log("Books fetched successfully:", response.data);
        })
        .catch(error => {
            console.error("Error fetching books:", error);
        });
}

// Task 11: Get book details based on ISBN (using async/await)
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`);
        console.log(`Book details for ISBN ${isbn}:`, response.data);
    } catch (error) {
        console.error(`Error fetching book details for ISBN ${isbn}:`, error);
    }
}

// Task 11: Get book details based on ISBN (using Promise callbacks)
function getBookByISBNWithPromises(isbn) {
    axios.get(`https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`)
        .then(response => {
            console.log(`Book details for ISBN ${isbn}:`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching book details for ISBN ${isbn}:`, error);
        });
}

// Task 12: Get book details based on Author (using async/await)
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/${author}`);
        console.log(`Books by author ${author}:`, response.data);
    } catch (error) {
        console.error(`Error fetching books by author ${author}:`, error);
    }
}

// Task 12: Get book details based on Author (using Promise callbacks)
function getBooksByAuthorWithPromises(author) {
    axios.get(`https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/${author}`)
        .then(response => {
            console.log(`Books by author ${author}:`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching books by author ${author}:`, error);
        });
}

// Task 13: Get book details based on Title (using async/await)
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${title}`);
        console.log(`Books with title "${title}":`, response.data);
    } catch (error) {
        console.error(`Error fetching books with title "${title}":`, error);
    }
}

// Task 13: Get book details based on Title (using Promise callbacks)
function getBooksByTitleWithPromises(title) {
    axios.get(`https://ariannacicin-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${title}`)
        .then(response => {
            console.log(`Books with title "${title}":`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching books with title "${title}":`, error);
        });
}

// Esegui le funzioni per i vari task
getBooks(); // Task 10 - Using async/await
getBooksWithPromises(); // Task 10 - Using Promise callbacks

getBookByISBN("978-0451524935"); // Task 11 - Using async/await
getBookByISBNWithPromises("978-0451524935"); // Task 11 - Using Promise callbacks

getBooksByAuthor("George Orwell"); // Task 12 - Using async/await
getBooksByAuthorWithPromises("George Orwell"); // Task 12 - Using Promise callbacks

getBooksByTitle("1984"); // Task 13 - Using async/await
getBooksByTitleWithPromises("1984"); // Task 13 - Using Promise callbacks


module.exports.general = public_users;