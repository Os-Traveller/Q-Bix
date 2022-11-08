import React, { useState } from "react";
import { useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import Modal from "../../../../components/shared/Modal";
import { colorGreen } from "../../../../components/styles/colors";
import { serverAddress } from "../../../../components/varables";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";

const FeesDetail = () => {
  const [feesInfo, setFeesInfo] = useState({});
  const [userFirebase] = useAuthState(auth);

  useEffect(() => {
    const url = `${serverAddress}/fees-info-details/${userFirebase?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => setFeesInfo(res));
  }, [userFirebase]);

  return (
    <div className="card">
      <h1 className="font-semibold uppercase mb-10 text-2xl" style={{ letterSpacing: "5px" }}>
        All Fees & Waiver
      </h1>
      <table className="w-full">
        <thead className="uppercase text-sm text-center text-gray-400 font-semibold border-b">
          <th className="py-3">Semester</th>
          <th>Demand</th>
          <th>Waiver</th>
          <th>Payment</th>
          <th>Due</th>
          <th>Details</th>
        </thead>
        <tbody>
          {Object.keys(feesInfo).map((semester, index) => (
            <TableRow data={feesInfo[semester]} semester={semester} key={index} />
          ))}
          {/* {fees?.map((fee, index) => (
            <TableRow data={fee} key={index} />
          ))} */}
        </tbody>
      </table>
      {/* payment */}
    </div>
  );
};

const TableRow = ({ data, semester }) => {
  const { demand, waiver, paid, fees } = data;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <tr className="w-full text-center text-sm">
        <td className="py-5">{semester}</td>
        <td>{demand}</td>
        <td>{waiver}</td>
        <td>{paid}</td>
        <td>{demand - waiver - paid}</td>
        <td>
          <button
            className="py-2 px-5 rounded buble"
            style={{ backgroundColor: colorGreen }}
            onClick={() => setOpenModal(true)}
          >
            Detail
          </button>
        </td>
      </tr>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={"Invoices : " + semester}
        width="800px"
      >
        <div className="rounded-md bg-[#131B4D] opacity-80 text-white p-5">
          <h1 className="text-xl font-semibold mb-8">Your Transaction</h1>
          <div className="flex flex-col gap-5">
            {fees?.map((data, index) => (
              <div key={index}>
                <h2 className="capitalize text-lg mb-2">{data.payType} Fees</h2>
                <h2 className="flex gap-2 items-center mb-2">
                  <BiCalendar className="text-2xl" />{" "}
                  <span className="uppercase text-lg font-semibold" style={{ wordSpacing: "5px" }}>
                    {data?.date.day} {data?.date?.month} {data?.date?.year}
                  </span>
                </h2>
                <div className="flex justify-between text-lg text-gray-400">
                  <p className="text-sm">
                    Trx ID : <strong>{data?.transcationId}</strong>
                  </p>
                  <p>
                    &#x09F3; <strong>{data?.amount}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
      {/*  */}
    </>
  );
};
export default FeesDetail;
