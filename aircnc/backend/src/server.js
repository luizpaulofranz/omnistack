const express = require("express");
const routes = require("./routes");

const app = express();

// req.query gets our query params
// req.params gets our route params
// req.body gets our request payload

// to parse json body
app.use(express.json());
app.use(routes);

app.listen(3333);
