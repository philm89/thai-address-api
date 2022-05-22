import { TData } from './models'
import thaiData from './schema'

export default class ThaiDataService {

    public createEntry(data_params: TData, callback: any) {
        const _session = new thaiData(data_params);
        _session.save(callback)
    }

    public filterEntry(query: any, callback: any) {
        thaiData.findOne(query, callback)
    }

    public updateEntry(data_params: TData, callback: any) {
        const query = { _id: data_params._id }
        thaiData.findOneAndUpdate(query, data_params, callback)
    }

    public deleteEntry(_id: String, callback: any) {
        const query = { _id: _id }
        thaiData.deleteOne(query, callback)
    }

}