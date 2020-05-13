import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { axisBottom, axisRight, scaleLinear, select } from "d3";
import PCA from "pca-js"
import PrincipalComponentsChart from './components/PrincipalComponentChart'

function App() {
  const [data, setData] = useState([[0, 0]]);
  const [principalComponents, setPrincipalComponents] = useState([0, 0])
  const svgRef = useRef();

  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 50; i++) {
      newData = newData.concat([[
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
      ]])
    }
    setData(newData)
  }

  // this executes on page load and every time the data changes
  useEffect(() => {
    const svg = select(svgRef.current);

    const maxX = Math.max(...data.map(value => value[0]))
    const maxY = Math.max(...data.map(value => value[1]))
    const minX = Math.min(...data.map(value => value[0]))
    const minY = Math.min(...data.map(value => value[1]))

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
      .attr("cx", value => xScale(value[0]))
      .attr("cy", value => yScale(value[1]))

    const vectors = PCA.getEigenVectors(data)
    setPrincipalComponents(vectors.map(vector => vector.eigenvalue))
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
      <br />
      <PrincipalComponentsChart principalComponents={principalComponents} />
    </React.Fragment>
  );
}

export default App;
