import React, { useEffect, useRef } from 'react'
import { axisBottom, axisRight, scaleLinear, select, mouse } from "d3";

const ScatterPlot = ({ data, setData }) => {
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
      .transition()
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(600px)")
      .transition()
      .call(yAxis);

    svg
      .selectAll(".dataPoint")
      .data(data)
      .join("circle")
      .attr("class", "dataPoint")
      .attr("r", 3)
      .transition()
      .attr("cx", value => xScale(value[0]))
      .attr("cy", value => yScale(value[1]))

    svg.on('click', () => {
      const mousePosition = mouse(svgRef.current)
      const newDataPoint = [
        xScale.invert(mousePosition[0]),
        yScale.invert(mousePosition[1]),
      ]
      setData(data.concat([newDataPoint]))
    })
  }, [data, setData]);

  return (
    <svg ref={svgRef} width="600" height="600" viewBox="0 0 600 600">
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>

  )
}

export default ScatterPlot
