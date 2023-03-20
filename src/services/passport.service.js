import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "../config/config";
import { User } from "../models/user.model";

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export const jwtStrategy = new Strategy(jwtOptions, function (
  jwtPayload,
  done
) {
  User.findOne({ id: jwtPayload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});
