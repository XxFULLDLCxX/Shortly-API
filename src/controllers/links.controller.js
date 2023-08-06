import {
  createLink, deleteLinkById, readLinkById, readLinkByShortUrl, updateLinkVisitCount
} from '../repository/links.repository.js';
import { nanoid } from 'nanoid';


export const getLinkById = async (req, res) => {
  try {
    const { rows: [link] } = await readLinkById(req.params.id);
    if (!link) return res.status(404).send("link not found");
    const { id, shortUrl, openUrl: url } = link;
    res.send({ id, shortUrl, url });
  }
  catch (err) { res.status(500).send(err.message); }
};

export const redirectToOpenUrl = async (req, res) => {
  try {
    const { rows: [link] } = await readLinkByShortUrl(req.params.shortUrl);
    if (!link) return res.status(404).send("link not found");
    await updateLinkVisitCount(++link.visitCount);
    res.redirect(200, link.openUrl);
  }
  catch (err) { res.status(500).send(err.message); }
};

export const postShortUrl = async (req, res) => {
  try {
    const { userId, url: openUrl, shortUrl } = { ...res.locals, shortUrl: nanoid(8) };
    await createLink(userId, openUrl, shortUrl);
    const { rows: [{ id }] } = await readLinkByShortUrl(shortUrl);
    return res.send({ id, shortUrl });
  }
  catch (err) { res.status(500).send(err.message); }
};

export const deleteLink = async (req, res) => {
  try {
    const { userId } = res.locals;
    const { rows: [link] } = await readLinkById(req.params.id);
    if (!link) return res.status(404).send("link not found");
    if (link.userId !== userId) return res.status(401).send("the link is not owned by the user");
    await deleteLinkById(req.params.id);
    res.sendStatus(204);
  }
  catch (err) { res.status(500).send(err.message); }
};
