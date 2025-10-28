import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import type { Express } from "express";
import type { User } from "@shared/schema";
import { pool } from "./db";

const scryptAsync = promisify(scrypt);
const PgSession = ConnectPgSimple(session);

export class PasswordService {
  static async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(supplied: string, stored: string): Promise<boolean> {
    const [hashedPassword, salt] = stored.split(".");
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }
}

export function setupAuth(app: Express, storage?: any) {
  const sessionSecret = process.env.SESSION_SECRET || "fallback-dev-secret-change-in-production";
  
  if (!process.env.SESSION_SECRET) {
    console.warn("⚠️  SESSION_SECRET not set, using fallback secret. This is insecure for production!");
  }

  const sessionStore = new PgSession({
    pool: pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
  });

  app.use(
    session({
      store: sessionStore,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // Lazy load storage to avoid async initialization issues
          const { storage: storageInstance } = await import("./storage");
          const user = await storageInstance.getUserByEmail(email);
          
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }

          if (!user.isActive) {
            return done(null, false, { message: "Account is inactive" });
          }

          const isValid = await PasswordService.compare(password, user.password);
          
          if (!isValid) {
            return done(null, false, { message: "Invalid email or password" });
          }

          await storageInstance.updateUserLastLogin(user.id);

          return done(null, {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      // Lazy load storage to avoid async initialization issues
      const { storage: storageInstance } = await import("./storage");
      const user = await storageInstance.getUser(id);
      
      if (!user) {
        return done(null, false);
      }

      if (!user.isActive) {
        return done(null, false);
      }

      done(null, {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (err) {
      done(err);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());

  return { sessionStore, PasswordService };
}
