const express = require("express");
const linksRouter = express.Router();

const { getAllTags, getAllLinks, createLink } = require("../db/index");

linksRouter.get("/", async (req, res, next) => {
  const links = await getAllLinks();
  res.send({
    links,
  });
});

linksRouter.post("/", async (req, res, next) => {
  const { linkname, count, comments, tags = "" } = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const linkData = {};
  if (tagArr.length) {
    linkData.tags = tagArr;
  }
  try {
    const link = await createLink(linkData);
    if (link) {
      res.send({ link });
    } else {
      ({
        name: "New link",
        message: "New link made",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = linksRouter;
