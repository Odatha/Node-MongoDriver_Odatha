//node app interact with mongodb server
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/"; //url to access mongo server
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  //second parameter is callback func

  assert.equal(err, null); //whether error is equal to null
  console.log("Connected correctly to server");
  const db = client.db(dbname); //connect to db

  dboper.insertDocument(
    db,
    { name: "Doughnut", description: "Test" },
    "dishes",
    (result) => {
      console.log("Insert Document:\n", result.ops); //no of operation

      dboper.findDocuments(db, "dishes", (docs) => {
        console.log("Found documents:\n", docs);

        dboper.updateDocument(
          db,
          { name: "Doughnut" },
          { description: "Updated Test" },
          "dishes",
          (result) => {
            console.log("Updated Document:\n", result.result);

            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found documents:\n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);

                client.close();
              });
            });
          }
        );
      });
    }
  );
});

//nesting of calls one inside the other, stcructure of callback functions
