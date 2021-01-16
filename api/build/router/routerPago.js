"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerPago_1 = __importDefault(require("../controller/controllerPago"));
const security_1 = require("../utils/security");
/**
* @classdesc Clase router de pago.
* @desc Fecha Creación: 11/04/2020
* @class
* @public
* @version 1.0.0
* @returns {routerPagos} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerPagos {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/:id", security_1.Security.checkToken, controllerPago_1.default.findByID);
        this.router.post("/", security_1.Security.checkToken, controllerPago_1.default.addPago);
        this.router.delete("/:id", security_1.Security.checkToken, controllerPago_1.default.deletePago);
    }
}
exports.default = new routerPagos().router;
