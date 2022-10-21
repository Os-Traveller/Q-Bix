import React, { useState } from "react";
import { colorGray } from "../../../components/colors";
import InputCredit from "../../../components/InputCredit";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const OnlinePayment = () => {
  const [user] = useAuthState(auth);
  const style = { backgroundColor: colorGray, padding: "10px 8px", borderRadius: "5px" };

  const [crCard, setCrCard] = useState("");
  const [stdId, setStdId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [amount, setAmount] = useState("");
  const [payType, setPayType] = useState("");

  return (
    <section className="grid gap-5" style={{ gridTemplateColumns: "1fr 400px" }}>
      {/* left side */}
      <div className="card px-10 py-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl logo font-semibold uppercase" style={{ letterSpacing: "3px" }}>
            Q-Pay
          </h2>
          <p className="flex gap-1 items-center font-semibold">
            <span style={style}>P</span>
            <span style={style}>A</span>
            <span style={style}>Y</span>
          </p>
        </div>
        <form className="flex flex-col gap-5" action="">
          <div>
            <h1 className="font-semibold mb-2">Chose Payment Type</h1>
            <div
              className="opacity-70 py-2 px-5 w-full border-[1px] border-gray-400 rounded-md"
              style={{ backgroundColor: colorGray }}
            >
              {/* <SiSuperuser /> */}
              <select
                name="paymentType"
                className="w-full outline-none"
                style={{ backgroundColor: colorGray }}
                onChange={(e) => setPayType(e.target.value)}
                required
              >
                <option value="type">Choose Payment Type</option>
                <option value="admission">Admission Fee</option>
                <option value="tuition">Tuition Fee</option>
                <option value="other">Other Fee</option>
              </select>
            </div>
          </div>
          {/* CrCard */}
          <InputCredit
            type={"number"}
            title={"Card Number"}
            id={"creditCardNo"}
            state={crCard}
            setState={setCrCard}
            detail={"Enter the 8-digit card number"}
          />
          {/* StdID */}
          <InputCredit
            type={"number"}
            title={"Student Id"}
            id={"creditCardNo"}
            state={stdId}
            setState={setStdId}
            detail={"Enter your 11 digit id"}
            axis="x"
          />
          {/* Mobile */}
          <InputCredit
            type={"number"}
            title={"Mobile No"}
            id={"creditCardNo"}
            state={mobileNo}
            setState={setMobileNo}
            detail={"Enter your Mobile Number"}
          />
          {/* Amount */}
          <InputCredit
            type={"number"}
            title={"Amount"}
            id={"creditCardNo"}
            state={amount}
            setState={setAmount}
            detail={"Enter The Amount"}
          />
          <button className="btnPay px-5 py-5 rounded-md w-[30%] mx-auto mt-10 uppercase font-semibold text-xl buble">
            Pay Now
          </button>
        </form>
      </div>
      {/* right side */}
      <div className="card p-8">
        {/* head info */}
        <div className="card bg-[#323232] mx-auto">
          <h1 className="font-semibold logo text-2xl uppercase text-center">Q-Pay</h1>
          <h2 className="text-center font-semibold mt-8 text-lg" style={{ letterSpacing: "2px" }}>
            {user.displayName}
          </h2>
        </div>
        {/* body info */}
        {/*  */}
        <div className="card mt-10">
          <div
            className="flex flex-col gap-3"
            style={{ borderBottom: "2px dashed gray", paddingBottom: "20px" }}
          >
            <p className="flex justify-between items-center text-lg">
              <span className="text-gray-400">Student ID</span>{" "}
              <strong>{stdId ? stdId : "****"}</strong>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="text-gray-400 upp">Payment Type</span>{" "}
              <strong className="uppercase">{payType ? payType : "****"}</strong>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="text-gray-400 upp">Phone</span>{" "}
              <strong className="uppercase">{mobileNo ? mobileNo : "****"}</strong>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="text-gray-400 upp">Amount</span>{" "}
              <strong className="uppercase"> {amount ? amount : "****"}</strong>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="text-gray-400 upp">VAT</span>{" "}
              <strong className="uppercase"> {amount ? amount * 0.02 : "****"}</strong>
            </p>
          </div>
          <p className="mt-5 flex justify-between items-end text-lg">
            <span className="text-gray-400 upp">Total</span>{" "}
            <strong className="uppercase">
              {" "}
              {amount ? parseFloat(amount) + parseFloat(amount * 0.02) : "****"}
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OnlinePayment;
