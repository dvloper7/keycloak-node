import config from "./config/app.config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import KeycloakConnectAdapter from "./adapters/keycloak/keycloak-connect.adapter";
import KeycloakService from "./services/keycloak.service";
import session from "express-session";
import morgan from "morgan";

const swig = require("swig-templates");
const app = express();

class App {
  private memoryStore = new session.MemoryStore();

  constructor(private app: express.Application) {
    this.configs();
    this.adapters();
    this.middlewares();
    this.publicRoutes();
    this.guard();
    this.privateRoutes();
    this.rootRoute();
  }

  private configs() {
    // usando o model engine swig
    this.app.engine("html", swig.renderFile);
    this.app.set("view engine", "html");
    this.app.set("views", __dirname + "/views");
  }

  private adapters() {
    // Define o adaptador a ser utilizado para integrar com o Keycloak
    KeycloakService.adapter(new KeycloakConnectAdapter());
    KeycloakService.init(this.memoryStore);
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    // Configuração do Express Session
    this.app.use(
      session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
        store: this.memoryStore,
      })
    );
    this.app.use(morgan("dev"));
  }

  private guard() {
    /**
     * Configuração do middleware do Keycloak (agente autorizador)
     */
    this.app.use(
      KeycloakService.getKeycloak().middleware({
        logout: "/logout",
        admin: "/",
      })
    );
  }

  private publicRoutes() {}

  private privateRoutes() {
    this.app.use(
      "/login",
      KeycloakService.getKeycloak().protect(),
      async (req, res) => {
        res.render("index", {
          grant: JSON.stringify(
            await KeycloakService.getKeycloak().getGrant(req, res)
          ),
        });
      }
    );
  }

  private rootRoute() {
    this.app.use("/", (req, res) => {
      res.render("index");
    });
  }

  listen() {
    this.app.listen(config.appPort, () => {
      console.log(
        "[Keycloak Node Integration]",
        "Listening at the port",
        config.appPort
      );
    });
  }
}

new App(app).listen();
