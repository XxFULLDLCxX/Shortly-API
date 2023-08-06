import { db } from "../database/database.connection.js";
import { readSessionByToken } from "../repository/auth.repository.js";

export const validateAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    console.log(token, `SELECT * FROM session WHERE "token" = $1;`, [token]);
    const { rows: [session] } = await readSessionByToken(token);

    if (!token || !session) return res.sendStatus(401);
    res.locals = { ...res.locals, userId: session.userId };
  } catch (err) { res.status(500).send(err.message); }
  next();
};
