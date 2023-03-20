import { expressApp } from "./services/express.service";
import { database } from "./services/mongoose.service";

expressApp.start();
database.connect();
database.seed();
