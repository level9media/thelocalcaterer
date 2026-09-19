import serverless from "serverless-http";
import { createNetlifyApp } from "../../server/netlifyApp";

const app = createNetlifyApp();

export const handler = serverless(app, {
  basePath: "/.netlify/functions",
});