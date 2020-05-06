import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select } from "d3";

function App() {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  const generateRandomScatterPlot = () => {
    var newData = []
    for (let i = 0; i < 50; i++) {
      newData = newData.concat({
        cx: Math.random() * 100,
        cy: Math.random() * 100,
      })
    }
    setData(newData)
  }

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 1)
      .attr("cx", value => value.cx)
      .attr("cy", value => value.cy)
  }, [data]);

  return (
    <React.Fragment>
      <h1>Webtools für die Lehre</h1>
      <svg ref={svgRef} width="auto" height="80vh" viewBox="0 0 100 100"></svg>
      <br />
      <button onClick={generateRandomScatterPlot}>
        Generate random scatter
      </button>
    </React.Fragment>
  );
}

export default App;
