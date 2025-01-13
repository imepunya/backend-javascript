const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
    // Check if there's a token in the request headers
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        // Extract the token from the "Bearer <token>" format
        const token = authHeader.split(' ')[1];
        
        // Verify the JWT token
        // Note: Replace 'fingerprint_customer' with your actual JWT secret key
        const decoded = jwt.verify(token, 'fingerprint_customer');
        
        // Add the decoded user information to the request object
        req.user = decoded;
        
        // Check if there's an active session
        if (!req.session.authenticated) {
            return res.status(401).json({ error: "No active session" });
        }

        // If everything is valid, proceed to the next middleware
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
