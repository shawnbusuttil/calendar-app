/* THIS IS A MOCK SERVER. IT IS NOT A REFLECTION OF A PRODUCTION SERVER */
const path = require('path');
const express = require('express');

const server = express();
server.use(express.static(path.join(__dirname, "../build")));

server.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

server.listen(8080, () => console.log("Listening on port 8080..."));