import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { axisBottom, axisRight, scaleLinear, select } from "d3";
import { ctranspose, eigs, multiply } from "mathjs"

function App() {
  const [data, setData] = useState([]);
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

  const empiricalMean = data => {
    const sum = [
      data.map(value => value[0]).reduce((accumulator, value) => accumulator + value, 0),
      data.map(value => value[1]).reduce((accumulator, value) => accumulator + value, 0)
    ]
    return [
      sum[0] /= data.length,
      sum[1] /= data.length,
    ]
  }

  const deviationsFromMean = data => {
    const mean = empiricalMean(data)
    return data.map(value => {
      return [
        value[0] -= mean[0],
        value[1] -= mean[1]
      ]
    })
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

    console.log("Emprical mean", empiricalMean(data))

    const deviations = deviationsFromMean(data)
    console.log("Deviations from mean", deviations)

    const covarianceMatrix = multiply(1 / (data.length - 1), ctranspose(deviations))
    console.log("Covariance Matrix", covarianceMatrix)

    // const eigenvalues = eigs(covarianceMatrix)
    // console.log(eigs)
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
