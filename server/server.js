const express = require("express");
const logger = require('./App/Middlewares/logger')
const app = express();
const connectDb = require('./App/Config/db.config')
const createRoutes = require('./App/Routes')
const path = require('path');
const PORT = process.env.PORT || 3001;
const errorhandler = require("./App/Middlewares/error")

app.use(express.json());

app.use(logger)

createRoutes(app);
//error Handler
app.use(errorhandler);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/message-app/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

connectDb()
app.listen(PORT);