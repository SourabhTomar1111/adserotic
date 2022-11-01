const createError = require("http-errors");
const express = require("express");
const path = require("path");
const connection = require("./config/db2");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
// const MemoryStore = require('memorystore')(sessions);
const flash = require("express-flash");
const upload = require("express-fileupload");
// const toastr = require('express-toastr');
const { readdirSync } = require("fs");
var paypal = require("paypal-rest-sdk");
const bodyParser = require("body-parser");
//-------------------------------
const { paypall } = require("./middleware/Paypal");
require("dotenv").config();
const MySQLStore = require("express-mysql-session")(session);
const db = require("./config/db");

// test.beforeEach(t => {
//   let root = document.getElementById('amount');
//   if (!root) {
//     root = document.createElement('div');
//     root.id = 'root';
//     document.body.appendChild(root);
//   }
//   t.context.root = root;
// });

// let RedisStore = require("connect-redis")(sessions)
// const { createClient } = require("redis")
// let redisClient = createClient({ legacyMode: false })
// redisClient.connect().catch(console.error)

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const publisherUserRouter = require("./routes/publisherUser");
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");
const advRouter = require("./routes/advertiser");
const pubRouter = require("./routes/publisher");
const lblRouter = require("./routes/label");
const mediaRouter = require("./routes/media");
const campaignRouter = require("./routes/campaigns");
const widgets = require("./routes/widgets/widgets");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
``;

//--------------------------paypal-------------------------

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECREATE,
});

let id;
let advertiser;
let publisher;
let campagin_Id;
let media_Id;
let price;

app.post("/pay", async (req, res) => {
  db.query("select id from pages", async function (error, results, fields) {
    if (error) {
      req.flash("error", "Error occurred. : " + error);
      res.redirect("/advertiser/campaigns");
    } else if (results.length > 0) {
      if (results[0].id == req.body.page) {
        db.query(
          'select price, user_id, id from pages where pages.id="' +
            req.body.page +
            '" ',
          function (error, results, fields) {
            if (error) {
              req.flash("error", "Error occurred. : " + error);
              res.redirect("/advertiser/campaigns");
            } else {
              if (
                results[0].price == req.body.amount &&
                results[0].user_id == req.body.publisher_url_id
              ) {
                price = req.body.amount;
                id = req.body.page;
                publisher = req.body.publisher_url_id;
                advertiser = req.body.Advertiser_User_Id;
                campagin_Id = req.body.campaign_id;
                media_Id = req.body.media_id;

                const create_payment_json = {
                  intent: "sale",
                  payer: {
                    payment_method: "paypal",
                  },
                  redirect_urls: {
                    return_url: "http://localhost:8084/success",
                    cancel_url: "http://localhost:8084/cancel",
                  },
                  transactions: [
                    {
                      item_list: {
                        items: [
                          {
                            price: price,
                            currency: "USD",
                            quantity: 1,
                          },
                        ],
                      },
                      amount: {
                        currency: "USD",
                        total: price,
                      },
                      description: "Hat for the best team ever",
                    },
                  ],
                };
                paypal.payment.create(
                  create_payment_json,
                  function (error, payment) {
                    if (error) {
                      throw error;
                    } else {
                      for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === "approval_url") {
                          res.redirect(payment.links[i].href);
                        }
                      }
                    }
                  }
                );
              } else {
                res.redirect(`/advertiser/payment/${req.body.campaign_id}`);
                res.end();
              }
            }
          }
        );
      } else {
        res.redirect(`/advertiser/payment/${req.body.campaign_id}`);
        res.end();
      }
    } else {
      res.redirect(`/advertiser/payment/${req.body.campaign_id}`);
      res.end();
    }
  });
});

app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: price,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        res.redirect("/advertiser/errorr");
        throw error;
      } else {
        // console.log(JSON.stringify(payment));
        // console.log(payment.state);
        res.redirect("/advertiser/successs");
        const price = payment.transactions[0].item_list.items[0].price;
        const transaction_Id =
          payment.transactions[0].related_resources[0].sale.id;
        const create_time =
          payment.transactions[0].related_resources[0].sale.create_time;
        const update_time =
          payment.transactions[0].related_resources[0].sale.update_time;
        const status = payment.state;
        const publisher_Id = id;
        const Advertiser_User_Id = advertiser;
        const publisher_User_Id = publisher;
        const campaginID = campagin_Id;
        const mediaId = media_Id;
        //-----------------------function call-------------------------//
        paypall(
          price,
          transaction_Id,
          create_time,
          update_time,
          status,
          price,
          publisher_Id,
          Advertiser_User_Id,
          publisher_User_Id,
          campaginID,
          mediaId
        );
      }
    }
  );
});

app.get("/cancel", (req, res) => res.redirect("/advertiser/campaigns"));
//-----------------------------------------------------------------------------------------------------------------------

//add bootstrap
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);

app.use(
  "/alertify",
  express.static(__dirname + "/node_modules/alertifyjs/build")
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

//app.use('./public/static_banner', express.static('./public/static_banner'));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
// app.use(sessions({
//     secret: "thisismysecretkeyabcdefghijklmnopqrstuvwxyz",
//     saveUninitialized:true,
//     resave: false,
//     // cookie: { },
//     // rolling: true
// }));

//4-mar-2022
// app.use(sessions({
//   cookie: { maxAge: oneDay },
//   // store: new MemoryStore({
//   //   checkPeriod: oneDay // prune expired entries every 24h
//   // }),
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   // saveUninitialized: true,
//   saveUninitialized: false,
// }))

const sessionStore = new MySQLStore({}, connection);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// app.use(toastr());

// app.use(function (req, res, next)
// {
//     res.locals.toasts = req.toastr.render()
//     next()
// });

app.use(
  upload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//routes define here
app.use("/", indexRouter);
app.use("/publisherUser", publisherUserRouter);
app.use("/user", userRouter);
app.use("/home", homeRouter);
app.use("/auth", authRouter);
app.use("/advertiser", advRouter);
app.use("/publisher", pubRouter);
app.use("/label", lblRouter);
app.use("/media", mediaRouter);
app.use("/campaign", campaignRouter);
app.use("/visit", widgets);

//Publisher's routes
readdirSync("./routes/publisher").map((file) => {
  app.use(require("./routes/publisher/" + file));
});

//Advertiser's routes
readdirSync("./routes/advertiser").map((file) => {
  app.use(require("./routes/advertiser/" + file));
});

readdirSync("./routes/widgets").map((file) => {
  app.use(require("./routes/widgets/" + file));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//custom to use session in view templates
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

//----------------------------------------------

module.exports = app;
