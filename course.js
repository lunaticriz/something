const mongoose = require("mongoose");
const { Router } = require("express");
const route = Router();
const MONGO = "mongodb://localhost:27017/learn_mongo";
mongoose.set("strictQuery", true);

route.post("/insertdata", (_, res) => {
  let data = [
    {
      university: "USAL",
      name: "Computer Science",
      level: "Excellent",
    },
    {
      university: "USAL",
      name: "Electronics",
      level: "Intermediate",
    },
    {
      university: "USAL",
      name: "Communication",
      level: "Excellent",
    },
    {
      university: "USAL",
      name: "Information Technologies",
      level: "Excellent",
    },
    {
      university: "USAL",
      name: "Commerce",
      level: "Intermediate",
    },
    {
      university: "USAL",
      name: "Laws",
      level: "Excellent",
    },
  ];
  mongoose.connect(MONGO, (err, db) => {
    if (err) throw new Error(err);
    db.collection("courses").insertMany(data, (err, result) => {
      if (err) throw new Error(err);
      res.status(201).json({ status: true, result: result });
    });
  });
});

module.exports = route;
