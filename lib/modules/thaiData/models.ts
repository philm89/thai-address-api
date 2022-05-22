
import { ModificationNote } from "../common/model"

export interface TData {
    _id?: String
    locationId: String
    name: {
        english: String
        thai: String
    }
    region: {
        english: String
        thai: String
    }
    population: Number
    households: Number
    townhallGeo: String
    is_deleted?: Boolean
    modification_notes: ModificationNote[]
}