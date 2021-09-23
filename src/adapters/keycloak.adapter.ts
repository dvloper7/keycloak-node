import session from "express-session";
import Keycloak from "keycloak-connect";

export default interface IKeycloakAdapter {
  init(memoryStore?: session.MemoryStore): void;
  getKeycloak(): Keycloak.Keycloak;
}
