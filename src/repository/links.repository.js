import { db } from '../database/database.connection.js';

export const createLink = (userId, openUrl, shortUrl) => db.query(
  `INSERT INTO "links" ("userId", "openUrl", "shortUrl") VALUES ($1, $2, $3);`, [userId, openUrl, shortUrl]);

export const readLinkById = (id) => db.query(
  `SELECT * FROM "links" WHERE "id" = $1;`, [id]);

export const readLinkByShortUrl = (shortUrl) => db.query(
  `SELECT * FROM "links" WHERE "shortUrl" = $1;`, [shortUrl]);

export const updateLinkVisitCount = (visitCount) => db.query(
  `UPDATE "links" SET "visitCount" = $1`, [visitCount]);

export const deleteLinkById = (id) => db.query(
  `DELETE FROM "links" WHERE "id" = $1;`, [id]);
