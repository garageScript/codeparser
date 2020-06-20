const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
  resave: false,
  secret: "lol",
  saveUninitialized: true,
}));

app.use( express.static('./') )

app.get('/', (req, res) => {
  if (req.query.user) {
    req.session.user = req.query.user
    return res.send(`<h1>cookie has been set</h1>`)
  }
  if (req.session.user) {
    return res.send(`<h1>welcome ${req.session.user}</h1>`)
  }
  return res.send(`<h1>Unrecognized</h1>`)
});

app.listen(3054);
