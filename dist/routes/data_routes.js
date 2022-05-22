"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const entryController_1 = require("../controllers/entryController");
class UserRoutes {
    constructor() {
        this.data_controller = new entryController_1.DataController();
    }
    route(app) {
        app.post('/api/data', (req, res) => {
            this.data_controller.create_entry(req, res);
        });
        app.get('/api/data/:id', (req, res) => {
            this.data_controller.get_entry(req, res);
        });
        app.put('/api/data/:id', (req, res) => {
            this.data_controller.update_entry(req, res);
        });
        app.delete('/api/data/:id', (req, res) => {
            this.data_controller.delete_entry(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
