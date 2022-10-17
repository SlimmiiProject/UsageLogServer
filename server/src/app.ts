import express, { request, Router } from "express";
import { Express } from "express-serve-static-core";
import "reflect-metadata";
import { DatabaseConnector } from "./data/DatabaseConnector";
import { Environment } from "./utils/Environment";
import helmet from "helmet";
import { Logger } from "./utils/Logger";

const cors = require("cors");
const session = require('express-session');
const { server_port, url, developmentEnv } = Environment.CONFIG;
const mysqlStore = require('express-mysql-session')(session);

export class App {

    public static readonly INSTANCE = new App();

    private _app: Express;

    public get App(): Express {
        return this._app;
    }

    private constructor() {
        this._app = express();
        this.setup();
        this.appSetup();
        this.setupSession();
        this.setupRoutes();
    }

    private async setup() {
        await DatabaseConnector.INSTANCE.initialize();
    }


    private appSetup() {
        this.App.use(express.json());
        this.App.use(express.urlencoded({ extended: true }));
        this.App.use(helmet());
        this.App.use(cors());
    }

    private setupSession() {
        const { session_secret, database } = Environment.CONFIG;
        const options = {
            connectionLimit: 10,
            password: database.password,
            user: database.username,
            database: database.database,
            host: database.host,
            port: database.port,
            createDatabaseTable: true
        }

        const sessionStore = new mysqlStore(options);

        this.App.use(session({
            name: process.env.SESS_NAME,
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            secret: session_secret,
            cookie: {
                sameSite: true,
                secure: developmentEnv
            }
        }))
    }

    private setupRoutes() {
        const apiRouter: Router = require("./routes/ApiRouter");
        const translationRouter: Router = require("./routes/TranslationRoutes");
        const userRouter: Router = require("./routes/UserRouter");
        const dataRouter: Router = require("./routes/DataRouter");
        const profileRouter: Router = require("./routes/ProfileRouter");

        this.App.use("/api", apiRouter);
        apiRouter.use("/translation", translationRouter);
        apiRouter.use("/users/:userId", userRouter);
        apiRouter.use("/data", dataRouter);
        apiRouter.use("/profiles", profileRouter);
    }

    public start() {
        this.App.listen(this.port, () => Logger.info(`App has started on: ${url}:${this.port}/`));
    }

    private get port() {
        return server_port;
    }
}

App.INSTANCE.start();