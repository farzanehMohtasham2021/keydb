const {client} = require("./connection");
const { promisify } = require("util");
const setValue = promisify(client.set).bind(client);
client.on("error", function (err) {
    console.log("Something went wrong ", err);
});
module.exports = function add(req) {
    let body = [];
    return new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
            body.push(chunk);
        }).on("end", () => {
            try {
                body = Buffer.concat(body).toString();
                let fields = JSON.parse(body);
                for(let [key, value] of Object.entries(fields)) {
                   resolve(setValue(key,value)) 
                }
            } catch (e) {                
                reject(e);
            }
        });
    });
};