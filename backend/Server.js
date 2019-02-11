const DB_NAME = "decode-alibay";
const DB_COLLECTION_PWD = "passwords";
const DB_COLLECTION_ITEMS = "items";

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

let dbo = undefined;
let dbs = MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
  if (err) throw err;
  dbs = allDbs;
  dbo = dbs.db(DB_NAME);
});

let getUser = (userInfo, cb) => {
  dbo
    .collection(DB_COLLECTION_PWD)
    .findOne({ user: userInfo.user }, (err, result) => {
      if (err) throw err;
      cb(result);
    });
};
let setUser = userInfo => {
  dbo.collection(DB_COLLECTION_PWD).insertOne(userInfo, (err, result) => {
    if (err) throw err;
  });
};

let addItem = itemInfo => {
  dbo.collection(DB_COLLECTION_ITEMS).insertOne(itemInfo, (err, result) => {
    if (err) throw err;
  });
};

let getAllItems = socket => {
  dbo
    .collection(DB_COLLECTION_ITEMS)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      socket.emit("send-items", { success: true, items: result });
    });
};

io.on("connection", function(socket) {
  /** */
  socket.on("signup", newUser => {
    console.log("in socket signup", newUser);
    let cb = result => {
      if (!result) {
        setUser(newUser);
        socket.emit("signup-success", { success: true });
      } else {
        socket.emit("signup-success", { success: false });
      }
    };
    getUser(newUser, cb);
  });

  /** */
  socket.on("login", userInfo => {
    console.log("in socket login", userInfo);

    let cb = result => {
      if (result && userInfo.pwd === result.pwd) {
        socket.emit("login-success", {
          success: true,
          username: result.user
        });
      } else {
        socket.emit("login-success", { success: false });
      }
    };
    let result = getUser(userInfo, cb);
  });

  /** */
  socket.on("logout", userInfo => {});

  /** */
  socket.on("add-item", newItem => {
    addItem(newItem);
  });
  /** */
  socket.on("ask-items", () => {
    getAllItems(socket);
  });
});

io.listen(4000);
