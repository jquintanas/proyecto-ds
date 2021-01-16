import { Router } from "express";
import alertController from "../controller/controllerNovelty";
import { Security } from "../utils/security";


/**
* @classdesc Novelty router class.
* @desc Creation Date: 04/11/2020
* @class
* @public
* @version 1.0.0
* @returns {routerAlerts} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerOrder {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.[get | post | put | delete]

        this.router.get("/nusuario", Security.checkToken, alertController.getAlertsUser);
        this.router.get("/novedades", Security.checkToken, alertController.getAlerts);
        this.router.get("/:id", Security.checkToken, alertController.findById);
        this.router.get("/reportado/:reportado", Security.checkToken, alertController.findByReported);
        this.router.get("/reporta/:reporta", Security.checkToken, alertController.findByReports);
        this.router.get("/", Security.checkToken, alertController.findAll);
        this.router.post("/", Security.checkToken, alertController.addAlerts);
        this.router.put("/:id/:reporta/:reportado", Security.checkToken, alertController.updateAlerts);

    }
}

export default new routerOrder().router
