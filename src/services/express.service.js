import express, { json } from "express";
import passport from "passport";
import { config } from "../config/config";
import { appRoutes } from "../routes";
import { jwtOptions, jwtStrategy } from "./passport.service";
import expressSwagger from "express-swagger-generator";

const app = express();

app.use(json());
app.use("/api/v1", appRoutes);

expressSwagger(app)(config.swaggerOptions);

passport.use(jwtStrategy, jwtOptions);

const PORT = config.port || 3000;

export const expressApp = {
  start: () => {
    app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
  },
};
