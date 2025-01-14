import React from "react";

const AnalysisItem = (props) => {
  console.log(props.data);
  // const toRemove = "\n";
  // const newString = props.data
  //   .replaceAll(new RegExp(toRemove, "g"), "")
  //   .split(":");
  const newString = props.data.split("ENDHEADLINE!!!");
  return (
    <div className="analysisItem">
      <div className="analysisItem--header">
        <strong>{newString[0]}</strong>
      </div>
      <div className="analysisItem--content">
        {newString[1].split("\n").map((s) => {
          return <div>{s}</div>;
        })}
      </div>
    </div>
  );
};

export default AnalysisItem;
