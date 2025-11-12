import UserModel from "../models/user/user-model";
import passport from "passport";

import { Strategy } from "passport-google-oauth20";
import { UserMiddlewareAuthParams } from "../types/request";

export function googleAuth() {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
        callbackURL: `/api/auth/google/callback`
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const userEmail = profile.emails[0].value;

          let userModel = await UserModel.findOne({
            email: userEmail
          });

          if (!userModel) {
            userModel = await UserModel.create({
              email: userEmail,
              balance: 0
            });
          }

          const params: UserMiddlewareAuthParams = {
            userId: userModel._id.toString()
          };

          done(null, params);
        } catch (e) {
          done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
