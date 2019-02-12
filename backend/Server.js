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
let ObjectId = require("mongodb").ObjectId;

let http = require("http").Server(app);
let io = require("socket.io")(http);
io.origins("*:*");

var multer = require("multer");
var upload = multer({ dest: "./public" });

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

let getSearchItems = (socket, search) => {
  dbo
    .collection(DB_COLLECTION_ITEMS)
    .find(search)
    .toArray((err, result) => {
      if (err) throw err;
      socket.emit("send-search-items", { success: true, items: result });
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
  socket.on("add-item", newItem => {
    // console.log("in add item", newItem);
    setItem(newItem);
  });
  /** */
  socket.on("ask-items", () => {
    getAllItems(socket);
  });

  /** */
  socket.on("ask-search-items", search => {
    getAllItems(socket, search);
  });
});

// app.post("/image-upload", upload.single("avatar"), function(req, res) {
//   console.log("in image-upload");
//   console.log(req.file);

//   // var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

//   res.send({ success: true, images: "" });
// });

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

app.listen(4001);

io.listen(4000);
