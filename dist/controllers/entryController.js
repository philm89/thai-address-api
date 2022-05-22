"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const service_1 = require("../modules/common/service");
const services_1 = require("../modules/thaiData/services");
class DataController {
    constructor() {
        this.data_service = new services_1.default();
    }
    create_entry(req, res) {
        // this check whether all the filds were send through the request or not
        if (req.body.locationId && req.body.name && req.body.name.english && req.body.name.thai && req.body.region &&
            req.body.region.english &&
            req.body.region.thai && req.body.population && req.body.households && req.body.townhallGeo) {
            const data_params = {
                locationId: req.body.locationId,
                name: {
                    english: req.body.name.english,
                    thai: req.body.name.thai
                },
                region: {
                    english: req.body.region.english,
                    thai: req.body.region.thai
                },
                population: req.body.population,
                households: req.body.households,
                townhallGeo: req.body.townhallGeo,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New Record Created'
                    }]
            };
            this.data_service.createEntry(data_params, (err, data) => {
                if (err) {
                    (0, service_1.mongoError)(err, res);
                }
                else {
                    (0, service_1.successResponse)('create entry successfull', data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            (0, service_1.insufficientParameters)(res);
        }
    }
    get_entry(req, res) {
        if (req.params.id) {
            const data_filter = { _id: req.params.id };
            this.data_service.filterEntry(data_filter, (err, data) => {
                if (err) {
                    (0, service_1.mongoError)(err, res);
                }
                else {
                    (0, service_1.successResponse)('get entry successfull', data, res);
                }
            });
        }
        else {
            (0, service_1.insufficientParameters)(res);
        }
    }
    update_entry(req, res) {
        if (req.params.id && req.params.locationId ||
            req.body.name || req.body.name.english || req.body.name.thai || req.body.region ||
            req.body.region.english ||
            req.body.region.thai ||
            req.body.population || req.body.households || req.body.households || req.body.townhallGeo) {
            const data_filter = { _id: req.params.id };
            this.data_service.filterEntry(data_filter, (err, data) => {
                if (err) {
                    (0, service_1.mongoError)(err, res);
                }
                else if (data) {
                    data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'Entry data updated'
                    });
                    const data_params = {
                        _id: req.params.id,
                        locationId: req.params.locationId,
                        name: req.body.name ? {
                            english: req.body.name.english ? req.body.name.english : data.name.english,
                            thai: req.body.name.thai ? req.body.name.thai : data.name.thai,
                        } : data.name,
                        region: req.body.region ? {
                            english: req.body.region.english ? req.body.region.english : data.region.english,
                            thai: req.body.region.thai ? req.body.region.thai : data.region.thai,
                        } : data.region,
                        population: req.body.population ? req.body.population : data.population,
                        households: req.body.households ? req.body.households : data.households,
                        townhallGeo: req.body.townhallGeo ? req.body.townhallGeo : data.townhallGeo,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : data.is_deleted,
                        modification_notes: data.modification_notes
                    };
                    this.data_service.updateEntry(data_params, (err) => {
                        if (err) {
                            (0, service_1.mongoError)(err, res);
                        }
                        else {
                            (0, service_1.successResponse)('update entry successfull', null, res);
                        }
                    });
                }
                else {
                    (0, service_1.failureResponse)('invalid entry', null, res);
                }
            });
        }
        else {
            (0, service_1.insufficientParameters)(res);
        }
    }
    delete_entry(req, res) {
        if (req.params.id) {
            this.data_service.deleteEntry(req.params.id, (err, delete_details) => {
                if (err) {
                    (0, service_1.mongoError)(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    (0, service_1.successResponse)('delete entry successfull', null, res);
                }
                else {
                    (0, service_1.failureResponse)('invalid entry', null, res);
                }
            });
        }
        else {
            (0, service_1.insufficientParameters)(res);
        }
    }
}
exports.DataController = DataController;
