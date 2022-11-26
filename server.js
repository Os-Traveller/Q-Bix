const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

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

    app.get("/get-admission-info", async (req, res) => {
      const deptInfo = await deptCollection.findOne({});
      delete deptInfo._id;
      const cursor = userCollection.find({ role: "student" });
      const students = await cursor.toArray();
      const studentsCount = {};
      Object.keys(deptInfo).forEach(async (dept) => {
        const tempStdLength = students.filter((std) => std.dept === dept).length;
        let length = tempStdLength.toString.length;
        let strLen = "";
        for (let i = 1; i <= 3 - length; i++) {
          strLen += 0;
        }
        // newId for new std
        strLen += tempStdLength + 1;
        studentsCount[dept] = strLen;
      });
      res.send({ deptInfo, studentsCount });
    });

    app.post("/admission", async (req, res) => {
      const stdInfo = req.body;
      const response = studentsCollection.insertOne(stdInfo);
      res.send(response);
    });

    // creating new user
    app.post("/create-user", async (req, res) => {
      const body = req.body;
      const { email, id, role, pin } = body;
      const student = await studentsCollection.findOne({ id });

      if (student) {
        // id found
        if (student.pin === pin) {
          // valid std
          if (!student.account) {
            // account not created yet
            const doc = {
              name: student.name,
              id,
              dept: student.dept,
              intake: student.intake,
              email,
              role,
            };
            const response = await userCollection.insertOne(doc);
            if (response.acknowledged) {
              // account created in database
              const updateDoc = {
                $set: {
                  account: true,
                },
              };
              await studentsCollection.updateOne({ id: id }, updateDoc);
              res.send({ response: true });
            } else {
              res.send({ response: false, code: "Could Not Add in Database" });
            }
          } else {
            // account already created
            res.send({ response: false, code: "Account Already Created" });
          }
        } else {
          // pin does not match
          res.send({ response: false, code: "Pin Doesn't Match" });
        }
      } else {
        // id not found
        res.send({ response: false, code: "Invalid Id" });
      }
    });

    // update profileInfo
    app.post("/update-profile", async (req, res) => {
      const { location, phone, email } = req.body;
      const filter = { email: email };
      const updateDoc = {
        $set: {
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
      if (dept && intake) {
        const intakeInfo = await deptCollection.findOne({});
        // the current semester to find the course of that semester
        const semester = intakeInfo[dept]?.intake[intake].semester;
        const course = await courseCollection.findOne({});

        res.send(course?.[dept]?.[semester - 1]);
      } else {
        res.send([]);
      }
    });

    // registration
    app.post("/registration/:email", async (req, res) => {
      const email = req.params.email;
      const courseList = req.body;
      const othersInfo = await othersCollection.findOne({});
      const currentSemester = othersInfo.currentSemester;
      const studentInfo = await userCollection.findOne({ email: email });
      const dept = studentInfo.dept;
      const feesPerCr = othersInfo.feesPerCr?.[dept];
      let subjects = studentInfo.subjects;

      let fees = 0;
      courseList.forEach((course) => {
        fees += parseFloat(course.credit) * parseFloat(feesPerCr);
      });

      if (subjects) {
        subjects[currentSemester] = courseList;
      } else {
        subjects = {};
        subjects[currentSemester] = courseList;
      }

      let demand = studentInfo.demand;
      if (demand) {
        demand += fees;
      } else {
        demand = fees;
      }
      console.log(dept, feesPerCr, demand);
      const updateDoc = {
        $set: {
          subjects: subjects,
          registered: true,
          demand: demand,
        },
      };

      const result = await userCollection.updateOne({ email: email }, updateDoc);
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
      let stdTotalCourseCount = 0;
      let stdTotalCredit = 0;

      for (let i = 0; i < courseList?.length; i++) {
        for (let j = 0; j < courseList[i]?.length; j++) {
          totalCourseCount++;
          totalCredit += courseList[i][j]?.credit;
        }
      }

      if (userCourseList) {
        Object.values(userCourseList).forEach((sem) => {
          for (let i = 0; i < sem.length; i++) {
            stdTotalCourseCount++;
            stdTotalCredit += sem[i].credit;
          }
        });
      }
      res.send({ totalCourseCount, totalCredit, stdTotalCourseCount, stdTotalCredit });
    });

    // cureent course info
    app.get("/current-course/:email", async (req, res) => {
      const email = req.params.email;
      const stdInfo = await userCollection.findOne({ email: email });
      const othersInfo = await othersCollection.findOne({});
      const currentSemester = othersInfo.currentSemester;
      const subjects = stdInfo?.subjects;
      if (subjects) {
        res.send({ subjects: subjects[currentSemester], semester: currentSemester });
      } else {
        res.send([]);
      }
    });

    app.get("/all-course/:email", async (req, res) => {
      const email = req.params.email;
      const userInfo = await userCollection.findOne({ email: email });
      const subjects = userInfo?.subjects;
      if (subjects) {
        res.send(subjects);
      } else {
        res.send({});
      }
    });

    // students Fees Info
    app.get("/fees-info/:email", async (req, res) => {
      const email = req.params.email;
      const userInfo = await userCollection.findOne({ email: email });
      const waiverInfo = userInfo?.waiver;

      let demand = userInfo.demand;
      if (!demand) {
        demand = 0;
      }

      let paid = userInfo.paid;
      if (!paid) {
        paid = 0;
      }

      let waiver = 0;
      if (waiverInfo) {
        Object.values(waiverInfo).forEach((semesterWaiver) => {
          waiver += semesterWaiver;
        });
      }

      res.send({ demand, paid, waiver });
    });

    // student feesinfo in detail
    app.get("/fees-info-details/:email", async (req, res) => {
      const email = req.params.email;
      const userInfo = await userCollection.findOne({ email: email });
      const othersInfo = await othersCollection.findOne({});
      const feesPerCr = othersInfo.feesPerCr?.[userInfo?.dept];
      const fees = userInfo.fees;
      const subjects = userInfo.subjects;
      const waiver = userInfo.waiver;
      if (subjects) {
        const semesterList = Object.keys(subjects);
        const feesInfoObj = {};
        semesterList.forEach((semester) => {
          // geting demand for any semester
          let demand = 0;
          subjects?.[semester].forEach((sub) => {
            demand += +sub.credit * feesPerCr;
          });
          // getting paid fees for any semester
          let paid = 0;
          fees?.[semester]?.forEach((fee) => {
            paid += +fee.amount;
          });

          feesInfoObj[semester] = {
            waiver: waiver?.[semester],
            demand: demand,
            paid: paid,
            fees: fees?.[semester],
          };
        });
        res.send(feesInfoObj);
      } else {
        res.send({});
      }
    });

    // pay fees
    app.post("/pay-fees/:email", async (req, res) => {
      const email = req.params.email;
      const userInfo = await userCollection.findOne({ email: email });
      const othersInfo = await othersCollection.findOne({});
      const currentSemester = othersInfo.currentSemester;
      let fees = userInfo.fees;
      const transcationId = "qb-" + Date.now();
      const arrFees = [];

      const date = new Date();
      const month = date.toLocaleDateString("en-US", { month: "long" });
      const year = date.getFullYear();
      const day = date.getDate();

      arrFees.push({ ...req.body, transcationId, date: { day, month, year } });
      let paid = userInfo.paid;

      if (paid) {
        paid += parseFloat(req.body?.amount);
      } else {
        paid = parseFloat(req.body?.amount);
      }

      if (fees) {
        // if fees already exists
        if (fees[currentSemester]) {
          // if current semester on fees object exists
          fees[currentSemester] = [...fees[currentSemester], ...arrFees];
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
          fees,
          paid,
        },
      };
      const result = await userCollection.updateOne({ email: email }, updateDoc);
      res.send(result);
    });

    app.get("/get-all-students-info", async (req, res) => {
      const cursor = userCollection.find({ role: "student" });
      const students = await cursor.toArray();
      const otherInfo = await othersCollection.findOne({});
      const semester = otherInfo.currentSemester;
      let dept = await deptCollection.findOne({});
      delete dept._id;
      res.send({ students, semester, dept });
    });

    app.get("/find-student-result/:id", async (req, res) => {
      const id = req.params.id;
      const otherInfo = await othersCollection.findOne({});
      const semester = otherInfo.currentSemester;
      const userInfo = await userCollection.findOne({ id: id });
      const subjects = userInfo?.subjects?.[semester];
      res.send(subjects);
    });

    app.post("/update-result/:id", async (req, res) => {
      const id = req.params.id;
      const subjects = req.body;
      const userInfo = await userCollection.findOne({ id: id });
      const othersInfo = await othersCollection.findOne({});
      const currentSemester = othersInfo.currentSemester;
      const subjectsDatabase = userInfo?.subjects;
      subjectsDatabase[currentSemester] = subjects;
      const updateDoc = {
        $set: {
          subjects: subjectsDatabase,
        },
      };
      const response = await userCollection.updateOne({ id: id }, updateDoc);
      res.send(response);
    });

    app.get("/ratio-admin-dashboard", async (req, res) => {
      const cursor = userCollection.find({ role: "student" });
      const allStd = await cursor.toArray();
      const registeredStd = allStd.filter((std) => std.registered === true);
      let demand = 0;
      let paid = 0;
      allStd.forEach((std) => {
        demand += parseFloat(std.demand);
        paid += parseFloat(std.paid);
      });
      res.send({ totalStd: allStd.length, registeredStd: registeredStd.length, demand, paid });
    });

    app.put("/update-cgpa-all", async (req, res) => {
      const cursor = userCollection.find({ role: "student" });
      const students = await cursor.toArray();

      // finding cgpa for all students
      students.forEach(async (std) => {
        const subjects = std.subjects;
        const id = std.id;
        let totalGradeCrPro = 0;
        let totalCredit = 0;
        Object.values(subjects).forEach((semester) => {
          semester.forEach((sub) => {
            totalCredit += sub.credit;
            totalGradeCrPro += sub.credit * sub.gradePoint;
          });
        });
        const cgpa = totalGradeCrPro / totalCredit;
        const updateDoc = {
          $set: {
            cgpa: parseFloat(cgpa.toFixed(2)),
          },
        };
        await userCollection.updateOne({ id: id }, updateDoc);
      });
    });

    app.put("/update-waiver-all", async (req, res) => {
      const cursor = userCollection.find({ role: "student" });
      const students = await cursor.toArray();
      const otherInfo = await othersCollection.findOne({});
      const currentSemester = otherInfo.currentSemester;

      const distributeWaiver = (cgpa) => {
        if (cgpa === 4.0) return 1;
        else if (cgpa >= 3.9) return 0.5;
        else if (cgpa >= 3.75) return 0.25;
        else if (cgpa >= 3.5) return 0.1;
        else return 0;
      };

      // updating waiver for all students
      students.forEach(async (std) => {
        const courses = std.subjects;
        const feesPerCr = otherInfo.feesPerCr[std.dept];
        const cgpa = std.cgpa;
        let waiverList = std.waiver;
        const id = std.id;

        let waiver = 0;
        let demand = 0;
        // checked if courses exist or not
        if (courses) {
          const currentCourse = courses?.[currentSemester];
          // checking if std registered or not
          if (currentCourse) {
            currentCourse.forEach((sub) => {
              demand += sub.credit * feesPerCr;
            });
          }
          waiver = demand * distributeWaiver(parseFloat(cgpa));
        }

        if (waiverList) {
          waiverList[currentSemester] = waiver;
        } else {
          waiverList = {};
          waiverList[currentSemester] = waiver;
        }

        // updatting waiver on database
        const updateDoc = {
          $set: {
            waiver: waiverList,
          },
        };
        const res = await userCollection.updateOne({ id: id }, updateDoc);
      });
      res.send(true);
    });

    // search
    app.post("/search", async (req, res) => {
      const keys = req.body;
      const cursor = userCollection.find({ role: "student" });
      const userList = await cursor.toArray();
      const result = [];

      // mapping throug all the user to find the list
      if (userList) {
        // if student exist
        userList.forEach((user) => {
          // for every user
          for (const key of keys) {
            //for each key
            // match name
            if (user.name.toLowerCase().includes(key.toLowerCase())) {
              result.push(user);
              break;
            }
            // match id
            else if (user.id.includes(key)) {
              result.push(user);
              break;
            }
            // match dept
            else if (user.dept.toLowerCase().includes(key.toLowerCase())) {
              result.push(user);
              break;
            }
            // match intake
            else if (user.intake.includes(key)) {
              result.push(user);
              break;
            }
            // match email
            else if (user.email.toLowerCase().includes(key.toLowerCase())) {
              result.push(user);
              break;
            }
          }
        });
        res.send(result);
      } else {
        // no students exist
        res.send({});
      }
    });
  } catch (err) {
    console.log(err);
  } finally {
    // do nothing
  }
}

run();
app.get("/", (req, res) => {
  res.send("Server is Connected");
});
