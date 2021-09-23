import keycloakConfig from "./keycloak.config";

export default {
  appPort: 3001,
  sessionSecret: process.env.SESSION_SECRET!,
  keycloak: keycloakConfig,
};
