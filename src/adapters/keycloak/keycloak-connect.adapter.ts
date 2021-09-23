import IKeycloakAdapter from "../keycloak.adapter";
import Keycloak from "keycloak-connect";
import session from "express-session";

let _keycloak: Keycloak.Keycloak;

/**
 * Adaptador de conexão com o Keycloak, essa classe encapsula o uso da lib keycloak-connect
 * e é a implementação padrão utilizada nesse microservice (olhar no arquivo keycloak.service.ts).
 * Para torná-lo "plugável" na service do Keycloak, necessita implementar a interface IKeycloakAdapter
 * Para mais informações: https://www.npmjs.com/package/keycloak-connect
 */
export default class KeycloakConnectAdapter implements IKeycloakAdapter {
  init(store?: session.MemoryStore) {
    if (_keycloak) {
      console.warn("Trying to init Keycloak again!");
      return _keycloak;
    }

    console.log("Initializing Keycloak...");
    _keycloak = new Keycloak({ store });
    return _keycloak;
  }

  getKeycloak(): Keycloak.Keycloak {
    return _keycloak;
  }
}
