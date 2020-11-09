//node app interact with mongodb server
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017/"; //url to access mongo server
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  //second parameter is callback func

  assert.equal(err, null); //whether error is equal to null
  console.log("Connected correctly to server");
  const db = client.db(dbname); //connect to db
  const collection = db.collection("dishes");

  collection.insertOne(
    { name: "Pizza", description: "test" },
    (err, result) => {
      assert.equal(err, null);

      console.log("After insert:\n");
      console.log(result.ops); //no of operation succeed

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        console.log("Found:\n");
        console.log(docs);

        db.dropCollection("dishes", (err, result) => {
          // to cleanup the db, remove collection dishes
          assert.equal(err, null);

          client.close(); //close the connection to the database
        });
      });
    }
  ); //document first arg, callback func 2nd arg
});

//nesting of calls one inside the other, stcructure of callback functions
