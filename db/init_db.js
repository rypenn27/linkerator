// code to build and initialize DB goes here
const {
  client,
  createLink,
  getAllLinks,
  createTags,
  getAllTags,
  getLinksByTagName,
  getlinksById,
  addTagsTolink,
  createlinkTag,
  // other db methods
} = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
       DROP TABLE IF EXISTS links;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        linkname varchar(255) UNIQUE NOT NULL,
        count INTEGER NOT NULL,
        comment varchar(255) NOT NULL
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL
        );
        CREATE TABLE link_tags (
          "linkId" INTEGER REFERENCES links(id),
          "tagId" INTEGER REFERENCES tags(id),
          UNIQUE ("linkId", "tagId")
        );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function buildTables() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await populateInitialData();

    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("creating links");
    await createLink({
      linkname: "www.google.com",
      count: 0,
      comment: "wow",
    });
    await createLink({
      linkname: "https://www.youtube.com/",
      count: 0,
      comment: "wow",
    });
    await createLink({
      linkname: "https://amazon.com/",
      count: 0,
      comment: "wow",
    });
    console.log("created");
    console.log("creating initial tags...");
    const initialtags = await createTags(["search", "knowledge", "tool"]);
    console.log("initial tags made");
  } catch (error) {
    console.log(error);
  }
}

async function testDB() {
  try {
    console.log("starting tests...");
    console.log("Calling getalllinks");
    const alllinks = await getAllLinks();
    console.log("Result:", alllinks);
    console.log("getting all tags");
    const alltags = await getAllTags();
    console.log("result:", alltags);
    console.log("got all tags");
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
}

buildTables()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
