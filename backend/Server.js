const DB_NAME = "decode-alibay";
const DB_COLLECTION_PWD = "passwords";
const DB_COLLECTION_ITEMS = "items";

let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let cookie = require("cookie");
let formData = require("express-form-data");
let axios = require("axios");
let fs = require("fs");

let app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

let MongoClient = require("mongodb").MongoClient;
const url = "mongodb://admin:Er123123@ds331135.mlab.com:31135/decode-alibay";
let ObjectId = require("mongodb").ObjectId;

let http = require("http").Server(app);
let io = require("socket.io")(http);
io.origins("*:*");

var multer = require("multer");
var upload = multer({ dest: "./public" });
app.use(formData.parse());

let sessions = [];

//Fuck up with Multer
// app.post("/uploadImage", (req, res) => {
//   console.log(req.headers.name, req.body);
//   fs.writeFileSync("./uploads/" + req.headers.name, req.body);
//   res.send(
//     JSON.stringify({ success: true, path: "./uploads/" + req.headers.name })
//   );
// });
app.use(bodyParser.raw({ type: "*/*" }));

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

let getItem = (itemInfo, cb) => {
  dbo
    .collection(DB_COLLECTION_ITEMS)
    .findOne(ObjectId(itemInfo), (err, result) => {
      if (err) throw err;
      cb(result);
    });
};

let setItem = itemInfo => {
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

let getSearchItems = (search, cb) => {
  search.search;
  dbo
    .collection(DB_COLLECTION_ITEMS)
    .find({
      $or: [
        { title: { $regex: search.search } },
        { desc: { $regex: search.search } }
      ]
    })
    .toArray((err, result) => {
      if (err) throw err;
      console.log("result", result);
      cb(result);
    });
};

io.on("connection", function(socket) {
  /** */
  socket.on("signup", newUser => {
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
    let cb = result => {
      if (result && userInfo.pwd === result.pwd) {
        // console.log(socket.request.header.cookie);
        socket.emit("login-success", {
          success: true,
          username: result.user
        });
      } else {
        socket.emit("login-success", { success: false });
      }
    };
    getUser(userInfo, cb);
  });

  /** */
  socket.on("logout", userInfo => {});

  /** */
  socket.on("ask-items", () => {
    getAllItems(socket);
  });

  /** */
  socket.on("ask-search-items", search => {
    getAllItems(socket, search);
  });
});

app.post("/add-item", function(req, res) {
  // let body = JSON.parse(req.body);
  // let image = req.image;
  setItem(JSON.parse(req.body));

  res.send(JSON.stringify({ success: true }));
});

app.post("/find-item", function(req, res) {
  let body = JSON.parse(req.body);
  let cb = result => {
    if (result) {
      res.send({ success: true, item: result });
    } else {
      res.send({ success: false });
    }
  };
  getItem(body.id, cb);
});

app.post("/searchallitems", function(req, res) {
  let search = JSON.parse(req.body);
  console.log(search);
  let cb = function(result) {
    console.log(result);
    res.send(JSON.stringify({ success: true, items: result }));
  };

  let result = getSearchItems(search, cb);
});

app.listen(4001);

io.listen(4000);
