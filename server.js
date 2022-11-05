const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());

// * lsitening to port * //
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const url = `mongodb+srv://${process.env.user_name}:${process.env.pass}@ost-cluster.i42fc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect().then(() => console.log("connected"));
    const database = client.db("q-bix");
    // all tables
    const userCollection = database.collection("users");
    const studentsCollection = database.collection("students");
    const courseCollection = database.collection("allCourse");
    const deptCollection = database.collection("dept");

    // geting all student information
    app.get("/students", async (req, res) => {
      const query = {};
      const cursor = studentsCollection.find(query);
      const students = await cursor.toArray();
      res.send(students);
    });

    // if user created update list
    app.get("/acc-created-std/:id", async (req, res) => {
      const _id = req.params.id;
      const filter = { _id: ObjectId(_id) };
      const updateDoc = {
        $set: {
          account: true,
        },
      };
      const result = await studentsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // creating new user
    app.post("/create-user", async (req, res) => {
      const body = req.body;
      const { name, email, id, role } = body;
      const doc = { name, email, id, role };
      const result = await userCollection.insertOne(doc);
      res.send(result.insertedId);
    });

    // update profileInfo
    app.post("/update-profile", async (req, res) => {
      const { intake, dept, section, location, phone, email } = req.body;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          intake,
          dept,
          section,
          location,
          phone,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // get a userInfo
    app.get("/user/:email/", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    // get allCourse List
    app.get("/course/:dept/:intake", async (req, res) => {
      const dept = req.params.dept;
      const intake = req.params.intake;
      const intakeInfo = await deptCollection.findOne({});
      // the current semester to find the course of that semester
      const semester = intakeInfo[dept]?.intake[intake].semester;
      const course = await courseCollection.findOne({});
      res.send(course?.[dept]?.[semester - 1]);
    });

    // registration
    app.post("/registration/:email", async (req, res) => {
      const email = req.params.email;
      const courseList = req.body;
      const filter = { email: email };
      const studentInfo = await userCollection.findOne(filter);
      let { subjects } = studentInfo;

      if (subjects) {
        subjects.push(courseList);
      } else {
        // for new studenst
        subjects = [];
        subjects.push(courseList);
      }

      const updateDoc = {
        $set: {
          subjects: subjects,
          registered: true,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, { upsert: true });
      res.send(result);
    });

    // resgitration status
    app.get("/registered/:email", async (req, res) => {
      const email = req.params.email;
      const regStatus = await userCollection.findOne({ email: email });
      res.send(regStatus.registered);
    });

    app.get("/current-course/:email", async (req, res) => {
      const email = req.params.email;
      const stdInfo = await userCollection.findOne({ email: email });
      res.send(stdInfo?.subjects);
    });
  } catch (err) {
    console.error(err);
  } finally {
    // do nothing
  }
}

run();

app.get("/", (req, res) => {
  res.send("Server is Connected");
});
