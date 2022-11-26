import React from "react";
import DpMaker from "../../../../components/shared/DpMaker";

const SearchResultCard = ({ name, email, id, intake, dept }) => {
  return (
    <div className="card">
      <div className="flex gap-8">
        <div>
          <DpMaker height={"90px"} name={name} fontSize="50px" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="">
            Name : <strong>{name}</strong>
          </p>
          <p>
            ID : <strong>{id}</strong>
          </p>
          <p>
            Email : <strong>{email}</strong>
          </p>
          <p>
            Dept : <strong className="uppercase">{dept}</strong>
          </p>
          <p>
            Intake : <strong>{intake}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
