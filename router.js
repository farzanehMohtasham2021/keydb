const setValues = require('./add')
const getValues = require('./read')
const respond = require('./response')
module.exports = function (req, res) {
  if (req.url === "/add" && req.method === "POST") {
    Promise.allSettled([setValues(req)]).then((response) => {
      if (response[0].status == "fulfilled") {
        respond.success(res, response[0].value);
      } else {
        respond.fauiler(res, response[0].value);
      }
    });
  } else if (req.url === "/read" && req.method === "POST") {
    Promise.allSettled([getValues()]).then((response) => {
      if (response[0].status == "fulfilled") {
        let countValue = Object.keys(response[0].value).length
        Object.assign(response[0].value, { count: countValue });
        respond.success(res, response[0].value);
      } else {
        respond.fauiler(res, response[0].value);
      }
    });
  } else {
    res.write("<h1>Home!<h1>");
    res.end();
  }
};

