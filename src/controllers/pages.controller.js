import { readLinksByUserId, readRanking, readUserById } from "../repository/pages.repository.js";


export const getUser = async (req, res) => {
  try {
    const { userId } = res.locals;
    const { rows: links } = await readLinksByUserId(userId);
    const { rows: [userInfo] } = await readUserById(userId);
    const result = { ...userInfo, shortenedUrls: links };
    res.send(result);
  }
  catch (err) { res.status(500).send(err.message); }
};

export const getRanking = async (req, res) => {
  try {
    const { rows: ranking } = await readRanking();
    return res.send(ranking);
  }
  catch (err) { res.status(500).send(err.message); }
};
