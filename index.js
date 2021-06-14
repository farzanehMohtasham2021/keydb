const router = require('./router')
const http = require("http")
const PORT = 5000;
const server = http.createServer(function (req, res) {
    router(req, res)
});
server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}...`);
});