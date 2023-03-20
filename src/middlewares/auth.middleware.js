import { Promise } from "bluebird";
import passport from "passport";
import { USER_ROLE } from "../models/user.model";
import { jwtStrategy } from "../services/passport.service";

const catcher = (res, error, status, forbidden = false) => {
  let auth_message = forbidden ? "Forbidden" : "Unauthorized";
  let error_message = error ? error.message : auth_message;
  return res.status(status).json({ message: error_message });
};

const jwt_handle = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  try {
    if (error || !user) {
      return catcher(res, error, 401, false);
    }
    if (!roles.includes(user.role)) {
      return catcher(res, error, 403, true);
    }
    await logIn(user, { session: false });
  } catch (e) {
    return next(catcher(res, error, 401, false));
  }
  req.user = user;
  return next();
};

export const auth = (roles = USER_ROLE) => {
  return (req, res, next) =>
    passport.authenticate(
      jwtStrategy,
      { session: false },
      jwt_handle(req, res, next, roles)
    )(req, res, next);
};
