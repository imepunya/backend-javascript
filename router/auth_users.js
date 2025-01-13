const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { 
    // Check if username exists in users array
    return !users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
    // Find user in the users array
    const user = users.find(user => 
        user.username === username && 
        user.password === password
    );
    return user !== undefined;
}

// Login endpoint for registered users
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    // Verify user credentials
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Generate JWT token
    const token = jwt.sign(
        { username: username },
        'your_jwt_secret',  // In production, use an environment variable
        { expiresIn: '1h' }
    );

    // Set session
    req.session.authorized = true;
    req.session.username = username;

    return res.status(200).json({
        message: "Login successful",
        token: token
    });
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.username;

    // Validate inputs
    if (!isbn || !review) {
        return res.status(400).json({
            message: "ISBN and review are required"
        });
    }

    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    // Initialize reviews array if it doesn't exist
    if (!books[isbn].reviews) {
        books[isbn].reviews = [];
    }

    // Check if user already posted a review
    const existingReviewIndex = books[isbn].reviews.findIndex(
        r => r.username === username
    );

    if (existingReviewIndex >= 0) {
        // Update existing review
        books[isbn].reviews[existingReviewIndex] = {
            username: username,
            review: review,
            date: new Date()
        };
    } else {
        // Add new review
        books[isbn].reviews.push({
            username: username,
            review: review,
            date: new Date()
        });
    }

    return res.status(200).json({
        message: "Review added/updated successfully",
        book: books[isbn]
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;