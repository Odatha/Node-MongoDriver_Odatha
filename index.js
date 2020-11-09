//node app interact with mongodb server
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/"; //url to access mongo server
const dbname = "conFusion";

MongoClient.connect(url)
  .then((client) => {
    //second parameter is callback func

    console.log("Connected correctly to server");
    const db = client.db(dbname); //connect to db

    dboper
      .insertDocument(db, { name: "Doughnut", description: "Test" }, "dishes")
      .then((result) => {
        console.log("Insert Document:\n", result.ops); //no of operation

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found documents:\n", docs);

        return dboper.updateDocument(
          db,
          { name: "Doughnut" },
          { description: "Updated Test" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated Document:\n", result.result);

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found documents:\n", docs);

        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("Dropped Collection: ", result);

        client.close();
      });
  })
  .catch((err) => console.log(err));
//nesting of calls one inside the other, stcructure of callback functions
