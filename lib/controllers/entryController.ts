import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { TData } from '../modules/thaiData/models'
import ThaiDataService from '../modules/thaiData/services';
import e = require('express');

export class DataController {

    private data_service: ThaiDataService = new ThaiDataService();

    public create_entry(req: Request, res: Response) {
        // this check whether all the filds were send through the request or not
        if (req.body.locationId && req.body.name && req.body.name.english && req.body.name.thai && req.body.region &&
            req.body.region.english &&
            req.body.region.thai && req.body.population && req.body.households && req.body.townhallGeo) {
            const data_params: TData = {
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
            this.data_service.createEntry(data_params, (err: any, data: TData) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create entry successfull', data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_entry(req: Request, res: Response) {
        if (req.params.id) {
            const data_filter = { _id: req.params.id };
            this.data_service.filterEntry(data_filter, (err: any, data: TData) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get entry successfull', data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_entry(req: Request, res: Response) {
        if (req.params.id && req.params.locationId ||
            req.body.name || req.body.name.english || req.body.name.thai || req.body.region ||
            req.body.region.english ||
            req.body.region.thai ||
            req.body.population || req.body.households || req.body.households || req.body.townhallGeo) {
            const data_filter = { _id: req.params.id };
            this.data_service.filterEntry(data_filter, (err: any, data: TData) => {
                if (err) {
                    mongoError(err, res);
                } else if (data) {
                    data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'Entry data updated'
                    });
                    const data_params: TData = {
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
                    this.data_service.updateEntry(data_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update entry successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid entry', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_entry(req: Request, res: Response) {
        if (req.params.id) {
            this.data_service.deleteEntry(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete entry successfull', null, res);
                } else {
                    failureResponse('invalid entry', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}