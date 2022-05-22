import { Application, Request, Response } from 'express';
import { DataController } from '../controllers/entryController';

export class UserRoutes {

    private data_controller: DataController = new DataController();

    public route(app: Application) {

        app.post('/api/data', (req: Request, res: Response) => {
            this.data_controller.create_entry(req, res);
        });

        app.get('/api/data/:id', (req: Request, res: Response) => {
            this.data_controller.get_entry(req, res);
        });

        app.put('/api/data/:id', (req: Request, res: Response) => {
            this.data_controller.update_entry(req, res);
        });

        app.delete('/api/data/:id', (req: Request, res: Response) => {
            this.data_controller.delete_entry(req, res);
        });

    }
}