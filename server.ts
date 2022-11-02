import express, { Express } from 'express';
import morgan from 'morgan';
import Router from "./src/routes/index"
import cors from 'cors';
import halmet from 'helmet';
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
const server: Express = express();

// configure passpoer

// configure server
server.use(morgan('dev')); // dev dependency for logging requests
server.use(express.json()); // parse json bodies
server.use(express.urlencoded({ extended: true })); // parse urlencoded bodies
server.use(cors()); // allow cross-origin requests !important for development only
server.use(halmet()); // secure your Express apps by setting various HTTP headers
server.use(passport.initialize({ userProperty: "user" }));

// configure router
server.use(Router);

export default server;