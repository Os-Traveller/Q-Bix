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
    const othersCollection = database.collection("others");

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
      console.log(email);
      const courseList = req.body;
      const filter = { email: email };
      const studentInfo = await userCollection.findOne(filter);

      let subjects = studentInfo?.subjects;

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
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // resgitration status
    app.get("/registered/:email", async (req, res) => {
      const email = req.params.email;
      const regStatus = await userCollection.findOne({ email: email });
      res.send(regStatus.registered);
    });

    // course ratio
    app.get("/course-ratio/:dept/:email", async (req, res) => {
      const dept = req.params.dept;
      const email = req.params.email;
      const allCourse = await courseCollection.findOne({});
      const courseList = allCourse?.[dept];
      const userInfo = await userCollection.findOne({ email: email });
      const userCourseList = userInfo?.subjects;
      // get total course;
      let totalCourseCount = 0;
      let totalCredit = 0;
      for (let i = 0; i < courseList.length; i++) {
        for (let j = 0; j < courseList[i].length; j++) {
          totalCourseCount++;
          totalCredit += courseList[i][j].credit;
        }
      }
      // get total course for std
      let stdTotalCourseCount = 0;
      let stdTotalCredit = 0;
      for (let i = 0; i < userCourseList.length; i++) {
        for (let j = 0; j < userCourseList[i].length; j++) {
          stdTotalCourseCount++;
          stdTotalCredit += userCourseList[i][j].credit;
        }
      }

      res.send({ totalCourseCount, totalCredit, stdTotalCourseCount, stdTotalCredit });
    });

    // student Fees Info
    app.get("/fees-info/:email/:dept", async (req, res) => {
      const email = req.params.email;
      const dept = req.params.dept;
      const userInfo = await userCollection.findOne({ email: email });
      const othersInfo = await othersCollection.findOne({});
      const feesPerCr = othersInfo.feesPerCr?.[dept];
      const userCourseList = userInfo?.subjects;
      const userFeesInfo = userInfo?.fees;

      let stdTotalCredit = 0;
      for (let i = 0; i < userCourseList.length; i++) {
        for (let j = 0; j < userCourseList[i].length; j++) {
          stdTotalCredit += userCourseList[i][j].credit;
        }
      }
      res.send({ stdTotalCredit, ...userFeesInfo, feesPerCr });
    });

    // cureent course info
    app.get("/current-course/:email", async (req, res) => {
      const email = req.params.email;
      const stdInfo = await userCollection.findOne({ email: email });
      const subjects = stdInfo?.subjects;
      res.send(subjects[subjects.length - 1]);
    });

    // pay fees
    app.post("/pay-fees/:email", async (req, res) => {
      const email = req.params.email;
      const userInfo = await userCollection.findOne({ email: email });
      const othersInfo = await othersCollection.findOne({});
      const currentSemester = othersInfo.currentSemester;
      let fees = userInfo.fees;
      const transcationId = "qb-" + Date.now();
      console.log(transcationId);
      const arrFees = [];
      arrFees.push({ ...req.body, transcationId });
      if (fees) {
        // if fees already exists
        if (fees[currentSemester]) {
          // if current semester on fees object exists
          fees[currentSemester] = [...fees[currentSemester], arrFees];
        } else {
          // fees exists but current semester does not exists
          fees[currentSemester] = arrFees;
        }
      } else {
        // fees does not exists
        fees = {};
        fees[currentSemester] = arrFees;
      }

      // update fees sagment
      const updateDoc = {
        $set: {
          fees: fees,
        },
      };

      const result = await userCollection.updateOne({ email: email }, updateDoc);

      if (result) {
        res.send(true);
      } else {
        res.send(false);
      }
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
