import React, { useEffect, useRef } from 'react'
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3'

const PrincipalComponentChart = ({ principalComponents }) => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)

    const maxY = Math.max(...principalComponents)

    const xScale = scaleBand()
      .domain(principalComponents.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, maxY])
      .range([150, 0]);

    const xAxis = axisBottom(xScale).ticks(principalComponents.length);
    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(principalComponents)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (value, index) => xScale(index))
      .attr('y', value => yScale(value))
      .attr('width', xScale.bandwidth())
      .attr('height', value => 150 - yScale(value))
      console.log([principalComponents])
    }, [principalComponents])

  return (
    <svg ref={svgRef} height="200" width="400">
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  )
}

export default PrincipalComponentChart
