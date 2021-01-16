"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagos = require('./../../models').Pagos;
const formasPagos = require('./../../models').formasPagos;
const global_1 = __importDefault(require("../utils/global"));
const security_1 = require("../utils/security");
/**
* @classdesc Payment controller class.
* @desc Creation Date: 11/04/2020
* @class
* @public
* @version 1.0.0
* @returns {PaymentController} PaymentController
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class PaymentController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar el pago en base al ID proporcionado en la url. <br> Fecha Creación: 11/04/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            if (isNaN(id)) {
                res.status(500).json({ log: "El ID introducido no es valido." });
                return;
            }
            id = Number(id);
            if (Number.isInteger(id) == false) {
                res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
                return;
            }
            pagos.findOne({
                where: {
                    idpago: id
                },
                attributes: ['idPago', 'idformaPago', 'total', 'imagen'],
                include: [
                    {
                        model: formasPagos,
                        required: true,
                        attributes: ['id', 'nombre', 'descripcion']
                    }
                ]
            }).then((data) => {
                if (data == null) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc   Este método se encarga de agregar los datos del pago realizado por el usuario, se debe validar la integridad
    de los mismos, cuando se ingresa exitosamente los datos se retorna el mensaje pertinente y la uri del recurso. <br> Fecha Creación: 11/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */
    addPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { hash } = req.body;
            let data = {
                idformaPago: req.body.idformaPago,
                imagen: req.body.imagen,
                total: req.body.total
            };
            let hashInterno = security_1.Security.hashJSON(data);
            //aqui se debe desencriptar el hash
            data.createdAt = new Date();
            if (hashInterno != hash) {
                res.status(401).json({ log: "Violación de integridad de datos, hash invalido." });
                return;
            }
            pagos.create(data).then((resp) => {
                if (resp._options.isNewRecord) {
                    res.status(202).json({
                        log: "Ingresado",
                        uri: global_1.default.globals.urlPaymentBase + resp.dataValues.idPago
                    });
                    return;
                }
                res.status(200).json({ log: "No se ingresaron los datos." });
                return;
            }, (err) => {
                res.status(500).json({ log: "Error" });
                console.log(err);
                return;
            });
        });
    }
    /**
    * @async
    * @method
    * @public
    * @version 1.0.0
    * @author Jonathan Quintana <jiquinta@espol.edu.ec>
    * @returns {JSON} JSON con la respuesta de la transacción.
    * @desc   Este método se encarga de eliminar una forma de pago en base al ID que se proporciona por la url. <br> Fecha Creación: 11/04/2020
    * @param {Request} req Objeto Request
    * @param {Response} res Objeto response
    * @type {Promise<void>} Promesa de tipo void.
    */
    deletePago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            if (isNaN(id)) {
                res.status(500).json({ log: "El ID introducido no es valido." });
                return;
            }
            id = Number(id);
            if (Number.isInteger(id) == false) {
                res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
                return;
            }
            pagos.destroy({ where: { idPago: id } }).then((data) => {
                if (data == 1) {
                    res.status(200).json({ log: "Eliminado" });
                    return;
                }
                else {
                    res.status(200).json({ log: "Sin datos a eliminar." });
                    return;
                }
            }, (err) => {
                res.status(500).json({ log: "Error" });
                console.log(err);
                return;
            });
        });
    }
}
exports.default = new PaymentController();
