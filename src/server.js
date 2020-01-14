import { GraphQLServer } from "graphql-yoga";
require("dotenv").config();
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✅GraphQL서버 시작  http://localhost:${PORT}`)
);
