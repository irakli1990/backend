import * as dotenv from "dotenv";

dotenv.config();

console.log(`${__dirname.split("/config")[0]}`);

export const config = {
  port: process.env.PORT,
  mongodb: process.env.MONGO_DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  swaggerOptions: {
    swaggerDefinition: {
      info: {
        description: "This is a sample server",
        title: "Swagger",
        version: "1.0.0",
      },
      host: "localhost:3000",
      basePath: "/api/v1",
      produces: ["application/json"],
      schemes: ["http", "https"],
      securityDefinitions: {
        JWT: {
          type: "token",
          in: "header",
          name: "Authorization",
          description: "",
        },
      },
    },
    models: {
      User: {},
    },
    basedir: `${__dirname.split("/config")[0]}`, //app absolute path
    files: ["./routes/**/*.js"], //Path to the API handle folder
  },
};
