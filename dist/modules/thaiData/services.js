"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class ThaiDataService {
    createEntry(data_params, callback) {
        const _session = new schema_1.default(data_params);
        _session.save(callback);
    }
    filterEntry(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    updateEntry(data_params, callback) {
        const query = { _id: data_params._id };
        schema_1.default.findOneAndUpdate(query, data_params, callback);
    }
    deleteEntry(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = ThaiDataService;
