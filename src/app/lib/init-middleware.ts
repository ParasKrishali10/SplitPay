import { NextApiRequest, NextApiResponse } from "next";


type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  result?:any
) => void;


export default function initMiddleware(middleware: Middleware) {
  return (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result:any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
}
