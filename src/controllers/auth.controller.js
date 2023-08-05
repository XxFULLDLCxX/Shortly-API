import { createSession, createUser, deleteSession, readSession, readUserByEmail } from '../repository/auth.repository.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = res.locals;
    if ((await readUserByEmail(email)).rowCount !== 0)
      return res.status(409).send("email already registered.");

    await createUser(name, email, bcrypt.hashSync(password, 10));

    return res.sendStatus(201);
  }
  catch (err) { res.status(500).send(err.message); }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = res.locals;
    const { rows: [user] } = await readUserByEmail(email);

    if (!user) return res.status(401).send("email is not yet registered.");
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).send("password is incorrect!");

    await deleteSession(user.id);
    await createSession(user.id);
    const { rows: [{ token }] } = await readSession(user.id);

    return res.send({ token });
  }
  catch (err) { res.status(500).send(err.message); }
};
