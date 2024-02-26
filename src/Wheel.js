import React, { useEffect, useState } from "react";
import "./Wheel.css";

const segments = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
];
const segmentDegrees = 360 / segments.length; // Divide the circle evenly by the number of segments

const Wheel = () => {
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    // Calculate a new rotation, ensuring a full spin plus a random segment
    const newRotation = rotation + 360 * 5 + Math.floor(Math.random() * 360);
    setRotation(newRotation);
  };

  useEffect(() => {
    if (rotation === 0) return; // Skip the effect on the first render
    const timer = setTimeout(() => {
      // Calculate the segment number
      const segmentNumber = Math.floor((rotation % 360) / segmentDegrees);
      alert(`You won: ${segments[segmentNumber]}`);
    }, 5000);
    return () => clearTimeout(timer);
  }, [rotation]);

  return (
    <div>
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "10px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "conic-gradient(" +
            segments
              .map(
                (_, index) =>
                  `#ccc ${index * segmentDegrees}deg, #ddd ${
                    index * segmentDegrees + segmentDegrees
                  }deg`
              )
              .join(", ") +
            ")",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 5s ease-out",
        }}
      >
        <span id="prize1">Prize 1</span>
        <span id="prize2">Prize 2</span>
        <span id="prize3">Prize 3</span>
        <span id="prize4">Prize 4</span>
        <span id="prize5">Prize 5</span>
        <span id="prize6">Prize 6</span>
      </div>
      <button onClick={spinWheel}>Spin</button>
    </div>
  );
};

export default Wheel;
