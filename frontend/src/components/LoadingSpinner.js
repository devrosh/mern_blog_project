import React from "react";
import { ColorRing } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <ColorRing
        visible={true}
        height="30"
        width="30"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#ffffff"]}
      />
    </div>
  );
};

export default LoadingSpinner;
