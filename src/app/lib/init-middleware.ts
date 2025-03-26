import { NextApiRequest, NextApiResponse } from "next";


type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (result?: Error | void) => void
) => void;


export default function initMiddleware(middleware: Middleware) {
  return (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result:Error | void) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
}
