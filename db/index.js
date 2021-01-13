// Connect to DB

const { Client } = require("pg");

const DB_NAME = "linkerator";
const DB_URL =
  process.env.DATABASE_URL ||
  `postgres://postgres:noles0306@localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

async function createLink({ linkname, count, comment }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      INSERT INTO links(linkname, count, comment) 
      VALUES($1, $2, $3) 
      ON CONFLICT (linkname) DO NOTHING 
      RETURNING *;
    `,
      [linkname, count, comment]
    );
    return link;
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
  try {
    const { rows } = await client.query(`
      SELECT linkname, count, comment 
      FROM links;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows: tags } = await client.query(`
      SELECT *
      FROM tags;
    `);
    return tags;
  } catch (error) {
    throw error;
  }
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }
  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");
  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");
  try {
    await client.query(
      `
    INSERT INTO tags(name)
    VALUES (${insertValues})
    ON CONFLICT (name) DO NOTHING;
    `,
      tagList
    );
    const { rows } = await client.query(
      `
    SELECT * FROM tags
    WHERE name IN (${selectValues});
    `,
      tagList
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createlinkTag(linkId, tagId) {
  try {
    await client.query(
      `
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `,
      [linkId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsTolink(linkId, tagList) {
  try {
    const createlinkTagPromises = tagList.map((tag) =>
      createlinkTag(linkId, tag.id)
    );
    await Promise.all(createlinkTagPromises);
    return await getlinksById(linkId);
  } catch (error) {
    throw error;
  }
}

async function getLinksByTagName(tagName) {
  try {
    const { rows: linkIds } = await client.query(
      `
      SELECT links.id
      FROM links
      JOIN link_tags ON link.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagId"
      WHERE tags.name=$1;
    `,
      [tagName]
    );
    return await Promise.all(postIds.map((post) => getPostById(post.id)));
  } catch (error) {
    throw error;
  }
}

async function getlinksById(linkId) {
  try {
    const {
      rows: [links],
    } = await client.query(
      `
      SELECT *
      FROM links
      WHERE id=$1;
    `,
      [linkId]
    );

    if (!link) {
      throw {
        name: "No Link",
        message: "Could not find a link with that ID",
      };
    }

    const { rows: tags } = await client.query(
      `
      SELECT tags.*
      FROM tags
      JOIN link_tags ON tags.id=link_tags."tagId"
      WHERE link_tags."linkId"=$1;
    `,
      [linkId]
    );
    return link;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  getAllLinks,
  createTags,
  getAllTags,
  getLinksByTagName,
  getlinksById,
  createlinkTag,
  addTagsTolink,
  // db methods
};
