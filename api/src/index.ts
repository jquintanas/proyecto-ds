/**
 * @classdesc Index class
 * @desc Creation Data: 11/04/2020
 * @author Danny Ríos <dprios@espol.edu.ec>
 */
import express, { Application } from "express";
import morgan from "morgan";
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require('helmet');
const expectCt = require('expect-ct');

import cors from "cors";

import Ordersrouter from "./router/routerOrders";
import Paymentrouter from "./router/routerPayment";
import Noveltyrouter from "./router/routerNovelty";
import Userrouter from "./router/routerUser";
import routerPurchase from "./router/routerPurchase";
import Loginrouter from "./router/routerLogin";
import routerInvoice from "./router/routerInvoice";

class Server {
  public app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.router();
  }

  config() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '/public')));
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
    this.app.use(helmet.permittedCrossDomainPolicies());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));
    this.app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));
    this.app.use(expectCt({
      enforce: true,
      maxAge: 30
    }))
  }


  router() {
    this.app.use("/api/orders", Ordersrouter);
    this.app.use("/api/payments", Paymentrouter);
    this.app.use("/api/noveltys", Noveltyrouter);
    this.app.use("/api/usersS", Userrouter);
    this.app.use("/api/purchase", routerPurchase);
    this.app.use("/api/login", Loginrouter);
    this.app.use("/api/invoice", routerInvoice);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port: ", this.app.get("port"));
    });
  }
}
const server = new Server();
server.start();