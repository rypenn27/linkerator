const express = require("express");
const linksRouter = express.Router();

const {
  getAllTags,
  getAllLinks,
  createLink,
  getOrCreateTag,
  createlinkTag,
} = require("../db/index");

linksRouter.get("/", async (req, res, next) => {
  const links = await getAllLinks();
  res.send({
    links,
  });
});

linksRouter.post("/", async (req, res, next) => {
  console.log("IN SERVER", req.body);
  const { linkname, comment, tags } = req.body;
  try {
    const link = await createLink({ linkname, comment, count: 0 });
    if (link) {
      console.log("tags", tags);
      for (let tagName of tags) {
        // Check if tag is already in datase
        // If yes, get the id
        // If no, create it and get Id
        const tag = await getOrCreateTag(tagName);

        // Create a FK-FK mapping from tag to link
        await createlinkTag(link.id, tag.id);
      }

      res.send({ success: true, data: link });
    } else {
      ({
        success: false,
        error: "Faild to create link in database",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = linksRouter;
