import React from "react";

const AnalysisItem = (props) => {
  console.log(props.data);
  const toRemove = "\n";
  const newString = props.data
    .replaceAll(new RegExp(toRemove, "g"), "")
    .split(":");
  return (
    <div className="analysisItem">
      <div className="analysisItem--header">
        <strong>{newString[0]}</strong>
      </div>
      <div className="analysisItem--content">{newString[1]}</div>
    </div>
  );
};

export default AnalysisItem;
