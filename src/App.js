import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { scaleLinear, select } from "d3";

function App() {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 50; i++) {
      newData = newData.concat({
        cx: Math.random() * 250,
        cy: Math.random() * 200,
      })
    }
    setData(newData)
  }

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, Math.max(...data.map(value => value.cx))])
      .range([0, 100]);

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map(value => value.cy))])
      .range([0, 100]);

    svg
      .selectAll(".dataPoint")
      .data(data)
      .join("circle")
      .attr("class", "dataPoint")
      .attr("r", 1)
      .attr("cx", value => xScale(value.cx))
      .attr("cy", value => yScale(value.cy))
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
