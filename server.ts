import dotenv from "dotenv";
dotenv.config();
import express, { Express } from 'express';
import morgan from 'morgan';
import Router from "./src/router/index"
import cors from 'cors';
import halmet from 'helmet';
import passport from "passport";
const server: Express = express();

declare global {
	namespace Express {
	  export interface Request {
		  log?: any
	  }
	}
}

// configure server
server.use(morgan('dev')); // dev dependency for logging requests
server.use(express.json({ limit: "10mb" })); // parse json bodies and limit the size of the body to 1mb
server.use(cors()); // allow cross-origin requests !important for development only
server.use(halmet()); // secure your Express apps by setting various HTTP headers
server.use(passport.initialize({ userProperty: "user" })); // initialize passport

// configure router
server.use(Router);

export default server;