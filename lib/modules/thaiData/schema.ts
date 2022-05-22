import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

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
    modification_notes: [ModificationNote]
});

export default mongoose.model('thaiData', schema);