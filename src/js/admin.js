class Admin {
  // updating result of one subject
  updateOneResult({ allSub, setAllSub, midRef, out30Ref, finalRef, code }) {
    const [subject] = allSub.filter((sub) => sub.code === code);
    const mid = midRef.current.value;
    const out30 = out30Ref.current.value;
    const final = finalRef.current.value;
    const allSubjects = allSub;

    // validating mid
    if (mid <= 0 || mid >= 30) {
      midRef.current.value = "";
      return false;
    }
    if (out30 <= 0 || out30 >= 30) {
      out30Ref.current.value = "";
      return false;
    }
    if (final <= 0 || final >= 40) {
      finalRef.current.value = "";
      return false;
    }
    subject.mid = mid;
    subject.out30 = out30;
    subject.final = final;

    allSubjects.forEach((sub) => {
      if (sub.code === code) {
        sub = subject;
      }
    });
    setAllSub(allSubjects);

    return true;
  }
  // updating to database
}
export default Admin;
