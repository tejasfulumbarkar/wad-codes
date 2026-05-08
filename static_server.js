const express = require("express");

const app = express();


// Serve static files from public folder
app.use(express.static("public"));


// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});