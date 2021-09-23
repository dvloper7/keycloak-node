import session from "express-session";
import IKeycloakAdapter from "../adapters/keycloak.adapter";
import KeycloakConnectAdapter from "../adapters/keycloak/keycloak-connect.adapter";

let _keycloakAdapter: IKeycloakAdapter;

class KeycloakService {
  adapter(keycloakAdapter: IKeycloakAdapter = new KeycloakConnectAdapter()) {
    _keycloakAdapter = keycloakAdapter;
  }

  init(memoryStore: session.MemoryStore) {
    _keycloakAdapter.init(memoryStore);
  }

  getKeycloak() {
    return _keycloakAdapter.getKeycloak();
  }
}

export default new KeycloakService();
