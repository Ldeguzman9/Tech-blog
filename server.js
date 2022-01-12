const express = require("express");
const routes = require("./controllers/");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
// import sequelize connection
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\n -------------------- App listening on port ${PORT}! --------------------`
    )
  );
});
