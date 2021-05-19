import { Request, Response } from 'express';

export default interface ControllerAction {
  run(request: Request, response: Response): Promise<void>;
}
