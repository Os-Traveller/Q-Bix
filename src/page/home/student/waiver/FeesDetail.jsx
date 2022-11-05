import React, { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import Modal from "../../../../components/shared/Modal";
import { colorGreen } from "../../../../components/styles/colors";

const FeesDetail = () => {
  const fees = [
    {
      semester: "Spring - 2020",
      demand: 47570,
      waiver: 15390,
      paid: 32180,
      detail: [
        { date: "01 March 2020", amount: 15600, trxId: "#tu:22.00:1:3:2020:135" },
        { date: "15 April 2020", amount: 7800, trxId: "#tu:22.32:15:4:2020:135" },
      ],
    },
    {
      semester: "Summer - 2021",
      demand: 36820,
      waiver: 28500,
      paid: 8230,
      detail: [
        { date: "01 March 2020", amount: 15600, trxId: "#tu:22.00:1:3:2020:135" },
        { date: "15 April 2020", amount: 7800, trxId: "#tu:22.32:15:4:2020:135" },
        { date: "01 March 2020", amount: 15600, trxId: "#tu:22.00:1:3:2020:135" },
        { date: "15 April 2020", amount: 7800, trxId: "#tu:22.32:15:4:2020:135" },
        { date: "01 March 2020", amount: 15600, trxId: "#tu:22.00:1:3:2020:135" },
        { date: "15 April 2020", amount: 7800, trxId: "#tu:22.32:15:4:2020:135" },
        { date: "01 March 2020", amount: 15600, trxId: "#tu:22.00:1:3:2020:135" },
        { date: "15 April 2020", amount: 7800, trxId: "#tu:22.32:15:4:2020:135" },
        { date: "01 March 2020", amount: 15600, trxId: "#tu:22.00:1:3:2020:135" },
        { date: "15 April 2020", amount: 7800, trxId: "#tu:22.32:15:4:2020:135" },
        { date: "01 March 2020", amount: 15600, trxId: "#tu:22.00:1:3:2020:135" },
        { date: "15 April 2020", amount: 7800, trxId: "#tu:22.32:15:4:2020:135" },
      ],
    },
  ];

  return (
    <div className="card">
      <h1 className="font-semibold uppercase mb-10 text-2xl" style={{ letterSpacing: "5px" }}>
        All Fees & Waiver
      </h1>
      <table className="w-full">
        <thead className="uppercase text-sm text-center text-gray-400 font-semibold border-b">
          <td className="py-3">Semester</td>
          <td>Demand</td>
          <td>Waiver</td>
          <td>Payment</td>
          <td>Due</td>
          <td>Details</td>
        </thead>
        <tbody>
          {fees?.map((fee, index) => (
            <TableRow data={fee} key={index} />
          ))}
        </tbody>
      </table>
      {/* payment */}
    </div>
  );
};

const TableRow = ({ data }) => {
  const { semester, demand, waiver, paid, detail } = data;
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
            {detail?.map((data, index) => (
              <div key={index}>
                <h2 className="flex gap-2 items-center mb-2">
                  <BiCalendar className="text-2xl" />{" "}
                  <span className="uppercase text-sm font-semibold">{data?.date}</span>
                </h2>
                <div className="flex justify-between text-lg text-gray-400">
                  <p>{data?.trxId}</p>
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
