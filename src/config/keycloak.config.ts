import { KeycloakConfig } from "keycloak-connect";

require("dotenv").config();

export default {
  realm: process.env.KEYCLOAK_REALM,
  "auth-server-url": process.env.KEYCLOAK_AUTH_SERVER_URL,
  "ssl-required": process.env.KEYCLOAK_SSL_REQUIRED,
  resource: process.env.KEYCLOAK_RESOURCE,
  "public-client": process.env.KEYCLOAK_PUBLIC_CLIENT === "true",
  "confidential-port": Number(process.env.KEYCLOAK_CONFIDENTIAL_PORT),
  "verify-token-audience":
    process.env.KEYCLOAK_VERIFY_TOKEN_AUDIENCE === "true",
  credentials: {
    secret: process.env.KEYCLOAK_CREDENTIALS_SECRET,
  },
  "policy-enforcer": {},
} as KeycloakConfig;
