"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const Schema = mongoose.Schema;
const schema = new Schema({
    locationId: Number,
    name: {
        type: {
            english: String,
            thai: String,
        }
    },
    region: {
        type: {
            english: String,
            thai: String,
        }
    },
    population: Number,
    households: Number,
    townhallGeo: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('thaiData', schema);
