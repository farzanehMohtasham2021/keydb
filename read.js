const { client } = require("./connection");
const { promisify } = require("util");
const getValue = promisify(client.get).bind(client);
const getKeys = promisify(client.keys).bind(client);
let arrayObj = {};
client.on("error", function (err) {
  console.log("Something went wrong ", err);
});
async function getAllKeys() {
  return await getKeys("*");
}
async function getAllValues(keys) {
  let value = await getValue(keys);
  arrayObj[keys] = value;
}
module.exports = async function read() {
    let keys = await getAllKeys();
    await Promise.all(
      keys.map(async (key) => {
        await getAllValues(key);
      })
    );
    return arrayObj
}

