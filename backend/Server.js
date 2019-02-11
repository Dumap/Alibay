const DB_NAME = "decode-alibay";
const DB_COLLECTION_PWD = "passwords";
const DB_COLLECTION_ITEM = "items";

let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let cookie = require("cookie");
let app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.raw({ type: "*/*" }));
app.use(cookieParser());

let MongoClient = require("mongodb").MongoClient;
const url = "mongodb://admin:Er123123@ds331135.mlab.com:31135/decode-alibay";

let http = require("http").Server(app);
let io = require("socket.io")(http);
io.origins("*:*");

let sessions = [];

// let displayMessages = function(socket) {
//   MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) throw err;
//     let dbo = db.db(DB_NAME);
//     dbo
//       .collection(DB_COLLECTION_MSG)
//       .find({})
//       .toArray((err, result) => {
//         if (err) throw err;
//         console.log(result);
//         socket.emit("send-messages", { success: true, chat: result.reverse() });
//       });
//   });
// };
// let addNewMessage = function(socket, dbo, msgInfo) {
//   dbo.collection(DB_COLLECTION_MSG).insertOne(msgInfo, (err, result) => {
//     if (err) throw err;
//   });
// };
let getUser = function(socket, dbo, userInfo) {};
let setUser = function(socket, dbo, userInfo) {
  dbo.collection(DB_COLLECTION_PWD).insertOne(userInfo, (err, result) => {
    if (err) throw err;
  });
};

io.on("connection", function(socket) {
  socket.on("signup", newUser => {
    console.log("in socket signup", newUser);
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo
        .collection(DB_COLLECTION_PWD)
        .find({ user: newUser.user })
        .toArray((err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            setUser(socket, dbo, newUser);
            socket.emit("signup-success", { success: true });
          } else {
            socket.emit("signup-success", { success: false });
          }
          db.close();
        });
    });
  });
  socket.on("login", userInfo => {
    console.log("in socket login", userInfo);
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      dbo
        .collection(DB_COLLECTION_PWD)
        .find({ user: userInfo.user })
        .toArray((err, result) => {
          if (err) throw err;
          if (result.length !== 0 && userInfo.pwd === result[0].pwd) {
            // let newMsg = {
            //   user: userInfo.user,
            //   msg: " has logged in."
            // };
            // addNewMessage(socket, dbo, newMsg);
            socket.emit("login-success", {
              success: true,
              username: result[0].user,
              color: result[0].color
            });
          } else {
            socket.emit("login-success", false);
          }
          db.close();
        });
    });
  });
  socket.on("logout", userInfo => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err;
      let dbo = db.db(DB_NAME);
      let newMsg = {
        user: userInfo.user,
        msg: " has logged out."
      };
      addNewMessage(socket, dbo, newMsg);
      db.close();
    });
  });
  //   socket.on("newmessage", newMessage => {
  //     console.log("in socket newmessage", newMessage);
  //     MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  //       if (err) throw err;
  //       let dbo = db.db(DB_NAME);
  //       addNewMessage(socket, dbo, newMessage);
  //       db.close();
  //     });
  //   });
  //   socket.on("ask-messages", () => {
  //     displayMessages(socket);
  //   });
});

io.listen(4000);
