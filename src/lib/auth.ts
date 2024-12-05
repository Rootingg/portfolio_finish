import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'XDY@rbg@grk!qge4ymiuvbevzeoivneoivbesoivbsovbosbvosbvoa4687684576878#~~@~sjijzoijzijpzjiqzjizjizn';

export async function createUser(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.execute({
    sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
    args: [username, hashedPassword]
  });
}

export async function verifyUser(username: string, password: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username]
  });

  const user = result.rows[0];
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password as string);
  if (!valid) return null;

  return user;
}

export function generateToken(user: any) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '24h'
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}