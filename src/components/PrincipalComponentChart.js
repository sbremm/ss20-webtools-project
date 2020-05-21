import React, { useEffect, useRef } from 'react'
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3'
import componentColorer from '../utils/componentColorer'

const PrincipalComponentChart = ({ principalComponents }) => {
  const svgRef = useRef()

  const eigenvalues = principalComponents.map(vector => vector.eigenvalue)

  useEffect(() => {
    const svg = select(svgRef.current)

    const maxY = Math.max(...eigenvalues)

    // create scales
    const xScale = scaleBand()
      .domain(eigenvalues.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, maxY])
      .range([150, 0]);

    // draw Y axis and bar numbers
    const xAxis = axisBottom(xScale).ticks(eigenvalues.length);
    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('transform', 'translateX(300px)')
      .transition()
      .call(yAxis);

    // draw bars
    svg
      .selectAll('.bar')
      .data(eigenvalues)
      .join('rect')
      .attr('class', 'bar')
      .style("transform", "scale(1, -1)")
      .attr('x', (value, index) => xScale(index))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('height', value => 150 - yScale(value))
      .style("fill", (_value, index) => componentColorer(index))
  }, [principalComponents, eigenvalues])

  return (
    <div id="principalComponents">
      <h3>Principal Components</h3>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}

export default PrincipalComponentChart