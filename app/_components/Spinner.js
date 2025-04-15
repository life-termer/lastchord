"use client";
import { Audio } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="mt-32 flex justify-center items-center z-40">
      <Audio
        visible={true}
        height="100"
        width="100"
        color="var(--primary)"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
}

export default Spinner;
