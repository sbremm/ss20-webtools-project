import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { axisBottom, axisRight, scaleLinear, select } from "d3";

function App() {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 50; i++) {
      newData = newData.concat({
        cx: Math.random() * 1000 - 500,
        cy: Math.random() * 1000 - 500,
      })
    }
    setData(newData)
  }

  const empiricalMean = data => {
    const sum = {
      cx: data.map(value => value.cx).reduce((accumulator, value) => accumulator + value, 0),
      cy: data.map(value => value.cy).reduce((accumulator, value) => accumulator + value, 0)
    }
    return {
      cx: sum.cx /= data.length,
      cy: sum.cy /= data.length,
    }
  }

  const deviationsFromMean = data => {
    const mean = empiricalMean(data)
    return data.map(value => {
      return {
      cx: value.cx -= mean.cx,
      cy: value.cy -= mean.cy
    }
  })
  }

  // this executes on page load and every time the data changes
  useEffect(() => {
    const svg = select(svgRef.current);

    const maxX = Math.max(...data.map(value => value.cx))
    const maxY = Math.max(...data.map(value => value.cy))
    const minX = Math.min(...data.map(value => value.cx))
    const minY = Math.min(...data.map(value => value.cy))

    const xScale = scaleLinear()
      .domain([minX, maxX])
      .range([0, 600]);

    const yScale = scaleLinear()
      .domain([minY, maxY])
      .range([0, 600]);

    const xAxis = axisBottom(xScale)
    svg
      .select(".x-axis")
      .style("transform", "translateY(600px)")
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(600px)")
      .call(yAxis);

    svg
      .selectAll(".dataPoint")
      .data(data)
      .join("circle")
      .attr("class", "dataPoint")
      .attr("r", 3)
      .attr("cx", value => xScale(value.cx))
      .attr("cy", value => yScale(value.cy))

      console.log(empiricalMean(data))
      console.log(deviationsFromMean(data))
  }, [data]);

  return (
    <React.Fragment>
      <h1>Webtools für die Lehre</h1>
      <svg ref={svgRef} width="650" height="650" viewBox="0 0 650 650">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <button onClick={generateRandomScatterPlot}>
        Generate random scatter plot
      </button>
    </React.Fragment>
  );
}

export default App;
