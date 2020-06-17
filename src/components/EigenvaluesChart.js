import React, { useEffect, useRef } from 'react'
import { Card, ResponsiveEmbed } from 'react-bootstrap'
import { axisBottom, axisRight, scaleBand, scaleLinear, select } from 'd3'
import componentColorer from '../utils/componentColorer'

const svgWidth = 300
const svgHeight = 150

const EigenvaluesChart = ({ principalComponents }) => {
  const svgRef = useRef()

  const eigenvalues = principalComponents.map(vector => vector.eigenvalue)

  useEffect(() => {
    const svg = select(svgRef.current)

    const maxY = Math.max(...eigenvalues)

    // create scales
    const xScale = scaleBand()
      .domain(eigenvalues.map((value, index) => index))
      .range([0, svgWidth])
      .padding(0.5)

    const yScale = scaleLinear()
      .domain([0, maxY])
      .range([svgHeight, 0])

    // draw Y axis and bar numbers
    const xAxis = axisBottom(xScale).ticks(eigenvalues.length)
    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis)

    const yAxis = axisRight(yScale)
    svg
      .select('.y-axis')
      .style('transform', 'translateX(300px)')
      .transition()
      .call(yAxis)

    // draw bars
    svg
      .selectAll('.bar')
      .data(eigenvalues)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScale(index))
      .attr('y', -svgHeight)
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('height', value => svgHeight - yScale(value))
      .style('fill', (_value, index) => componentColorer(index))
  }, [principalComponents, eigenvalues])

  return (
    <Card>


      <Card.Header as="h3">
        Eigenvalues
      </Card.Header>

      <Card.Body>
        <ResponsiveEmbed aspectRatio="16by9">
          <svg ref={svgRef} width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth + 30} ${svgHeight + 30}`}>
            <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#eee" />
            <g className="x-axis" />
            <g className="y-axis" />
          </svg>
        </ResponsiveEmbed>
      </Card.Body>
    </Card>
  )
}

export default EigenvaluesChart
