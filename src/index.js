// Import required modules
const express = require('express');
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes
const postRoutes = require('./routes/postRoutes'); // Import the userRoutes
const commentRoutes = require('./routes/commentRoutes'); // Import the userRoutes
// Create an instance of an Express app
const app = express();

// Configure middleware
// Use bodyParser to parse JSON request bodies
app.use(bodyParser.json());

// Mount routes
// Mount the userRoutes at the /users path
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Define other routes, if any
// For example, a root route to serve a welcome message

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Start the server
const PORT = 4000; // You can choose a different port if desired
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
