import React, { useEffect, useRef } from 'react'
import { axisBottom, axisRight, scaleLinear, select, mouse, event } from "d3";

const ScatterPlot = ({ data, setData, principalComponents }) => {
  const svgRef = useRef();

  // this executes on page load and every time the data changes
  useEffect(() => {
    const svg = select(svgRef.current);

    let maxX = 5
    let maxY = 5
    let minX = -5
    let minY = -5
    if (data.length > 0) {
      maxX = Math.max(...data.map(value => value[0])) + 5
      maxY = Math.max(...data.map(value => value[1])) + 5
      minX = Math.min(...data.map(value => value[0])) - 5
      minY = Math.min(...data.map(value => value[1])) - 5
    }

    // create scales that map our data to the fixed size screen space
    const xScale = scaleLinear()
      .domain([minX, maxX])
      .range([0, 600]);

    const yScale = scaleLinear()
      .domain([minY, maxY])
      .range([0, 600]);

    // draw X and Y axis
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

    // draw data points
    svg
      .selectAll(".dataPoint")
      .data(data)
      .join("circle")
      .attr("class", "dataPoint")
      .attr("r", 3)
      .transition()
      .attr("cx", value => xScale(value[0]))
      .attr("cy", value => yScale(value[1]))

    // data points are deleted on click
    svg
      .selectAll(".dataPoint")
      .on('click', (_value, index) => {
        event.stopPropagation() // prevents that the same click also adds a data point
        const newData = data.slice()
        newData.splice(index, 1)
        setData(newData)
      })

    svg.on('click', () => {
      const mousePosition = mouse(svgRef.current)
      const newDataPoint = [
        xScale.invert(mousePosition[0]),
        yScale.invert(mousePosition[1]),
      ]
      setData(data.concat([newDataPoint]))
    })

    // draw principal component vectors
    svg
      .selectAll(".component")
      .data(principalComponents)
      .join("line")
      .attr("class", "component")
      .attr("stroke-width", 2)
      .attr("stroke", "black")
      .transition()
      .attr("x1", component => xScale(minX * component.vector[0]))
      .attr("y1", component => yScale(minY * component.vector[1]))
      .attr("x2", component => xScale(maxX * component.vector[0]))
      .attr("y2", component => yScale(maxY * component.vector[1]))

  }, [data, setData, principalComponents]);

  return (
    <div id="scatterPlot">
      <h3>Scatter Plot</h3>
      <svg ref={svgRef} width="600" height="600" viewBox="0 0 600 600">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}

export default ScatterPlot
