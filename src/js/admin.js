import { serverAddress } from "../components/variables";

class Admin {
  // updating result of one subject
  updateOneResult({ allSub, setAllSub, midRef, out30Ref, finalRef, code }) {
    const [subject] = allSub.filter((sub) => sub.code === code);
    const mid = midRef.current.value;
    const out30 = out30Ref.current.value;
    const final = finalRef.current.value;
    const allSubjects = allSub;

    // validating mid
    if (mid < 0 || mid > 30) {
      midRef.current.value = "";
      return false;
    }
    if (out30 < 0 || out30 > 30) {
      out30Ref.current.value = "";
      return false;
    }
    if (final < 0 || final > 40) {
      finalRef.current.value = "";
      return false;
    }
    const total = parseFloat(mid) + parseFloat(out30) + parseFloat(final);
    subject.mid = mid;
    subject.out30 = out30;
    subject.final = final;
    subject.total = total;
    subject.grade = this.calcGrade(total);
    subject.gradePoint = this.calcGradePoint(total);

    allSubjects.forEach((sub) => {
      if (sub.code === code) {
        sub = subject;
      }
    });
    setAllSub(allSubjects);

    return true;
  }

  // updating to database
  calcGrade(total) {
    if (total < 40) return "F";
    else if (total < 45) return "D";
    else if (total < 50) return "D+";
    else if (total < 55) return "C";
    else if (total < 60) return "C+";
    else if (total < 65) return "B";
    else if (total < 70) return "B+";
    else if (total < 75) return "A-";
    else if (total < 80) return "A";
    else if (total >= 80) return "A+";
  }

  calcGradePoint(total) {
    if (total < 40) return 0.0;
    else if (total < 45) return 2.0;
    else if (total < 50) return 2.25;
    else if (total < 55) return 2.5;
    else if (total < 60) return 2.75;
    else if (total < 65) return 3.0;
    else if (total < 70) return 3.25;
    else if (total < 75) return 3.5;
    else if (total < 80) return 3.75;
    else if (total >= 80) return 4.0;
  }

  async updateResultOnServer({ subjects, id }) {
    const url = `${serverAddress}/update-result/${id}`;
    const requestOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(subjects),
    };
    const response = await fetch(url, requestOptions).then((res) => res.json());
    return response;
  }
  // updating all students cgpa
  async updateCgpaAll() {
    const url = `${serverAddress}/update-cgpa-all`;
    const response = await fetch(url, { method: "PUT" }).then((res) => res.json());
    return response;
  }
  async updaWaiverAll() {
    const url = `${serverAddress}/update-waiver-all`;
    const response = await fetch(url, { method: "PUT" }).then((res) => res.json);
    return response;
  }
}
export default Admin;
