import { Server } from "./server";

export interface CustomResponse{
    timeStamp: Date;
    statusCode: number;
    status: string;
    resaon: string;
    message: string;
    developerMessage: string;
    data: { servers?: Server[], server?: Server}
}