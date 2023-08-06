import { db } from "../database/database.connection.js";

export const readUserById = (userId) => db.query(
  `SELECT users.id, name, SUM("links"."visitCount") "visitCount" FROM users
   JOIN links ON links."userId" = users.id WHERE users.id = $1
   GROUP BY users.id, name;`, [userId]);

export const readLinksByUserId = (userId) => db.query(
  `SELECT id, "shortUrl", "openUrl" url, "visitCount" FROM links WHERE links."userId" = $1;`, [userId]);


// export const createRaking = ()

export const readRanking = () => db.query(
  `SELECT users.id, users.name, 
    COUNT(links)::INT "linksCount", 
    COALESCE(SUM(links."visitCount")::INT, 0) "visitCount" FROM users 
   LEFT JOIN links ON links."userId" = users.id
   GROUP BY users.id
   ORDER BY "visitCount" DESC
   LIMIT 10
   ;`);