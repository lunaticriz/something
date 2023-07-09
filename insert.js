const mongoose = require("mongoose");
const { Router } = require("express");
const route = Router();
const MONGO = "mongodb://localhost:27017/learn_mongo";
mongoose.set("strictQuery", true);
const redisClient = require("./helper");

route.post("/insertdata", (_, res) => {
  let data = [
    {
      country: "Spain",
      city: "Salamanca",
      name: "USAL",
      location: {
        type: "Point",
        coordinates: [-5.6722513, 17, 40.9607792],
      },
      students: [
        { year: 2018, number: 24775 },
        { year: 2018, number: 23165 },
        { year: 2018, number: 21915 },
        { year: 2018, number: 21715 },
      ],
    },
    {
      country: "Spain",
      city: "Salamanca",
      name: "UPSA",
      location: {
        type: "Point",
        coordinates: [-5.6691198, 17, 40.9631734],
      },
      students: [
        { year: 2014, number: 4783 },
        { year: 2015, number: 4823 },
        { year: 2016, number: 6553 },
        { year: 2017, number: 6123 },
      ],
    },
  ];
  mongoose.connect(MONGO, (err, db) => {
    if (err) throw new Error(err);
    db.collection("universities").insertMany(data, (err, result) => {
      if (err) throw new Error(err);
      return res.status(201).json({ status: true, result: result });
    });
  });
});

route.get("/get-details", async (_, res) => {
  const cachedData = await redisClient.get("universities_data");
  if (cachedData) {
    return res
      .status(200)
      .json({ status: true, cdata: JSON.parse(cachedData) });
  } else {
    mongoose.connect(MONGO, async (err, db) => {
      if (err) throw new Error(err);
      await db
        .collection("universities")
        .find()
        .toArray(async (err, result) => {
          if (err) throw new Error(err);
          await redisClient.setEx(
            "universities_data",
            30,
            JSON.stringify(result)
          );
          return res.status(200).json({ status: true, data: result });
        });
    });
  }
});

module.exports = route;
