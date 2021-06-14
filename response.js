function success(res, value) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
   res.write(JSON.stringify(value));
    res.end();
}

function fauiler(res, value) {
    res.writeHead(400, {
        "Content-Type": "text/html"
    });
    res.write(value);
    res.end();
}
module.exports = {
    success,
    fauiler
}