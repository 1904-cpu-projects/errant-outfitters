const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

//Main route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("tiny"));

app.use("/", express.static(path.join(__dirname, "../public")));

//Setting up sessions routes
app.use("/api/sessions", require("./routes/sessions"));

//Prepping for session/login/logout

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "We're going on a bear hunt",
//     cookie: { maxAge: 24 * 60 * 60 * 1000 },
//     resave: false,
//     saveUninitialized: false,
//     name: "SID",
//     store: new SequelizeStore({
//       db,
//       table: "session",
//       extendDefaultFields: (defaults, session) => ({
//         data: defaults.data,
//         expires: defaults.expires,
//         userId: session.userId
//       })
//     })
//   })
// );

//Main routes
app.use("/api/products", require("./routes/products"));
app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
