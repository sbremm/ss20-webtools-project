import React, { useEffect, useRef } from 'react'
import { axisBottom, axisRight, scaleLinear, select } from "d3";

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

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
  }, [data]);

  return (
    <svg ref={svgRef} width="650" height="650" viewBox="0 0 650 650">
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>

  )
}

export default ScatterPlot
