import { RequestHandler } from "express";

export default interface IKeycloak {
  protect(...roles: string[]): RequestHandler;
  middleware(): RequestHandler[];
}
