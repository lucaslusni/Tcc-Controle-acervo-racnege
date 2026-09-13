import React from "react";

const CoverRenderer = (props) => {
  if (!props.data || !props.data.imageUrl) return null; 
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={props.data.imageUrl}
        alt={props.data.title || "Sem título"}
        style={{
          height: "100%",
          width: "auto",  
          maxHeight: "150px", 
        }}
      />
    </div>
  );
};

export default CoverRenderer;