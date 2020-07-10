import React, { useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'
import { axisBottom, axisRight, easeSin, scaleBand, scaleLinear, select } from 'd3'
import componentColorer from '../utils/componentColorer'
import HelpButton from './HelpButton'
import Descriptions from '../data/descriptions'

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
      .ease(easeSin)
      .duration(500)
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
      .ease(easeSin)
      .duration(500)
      .attr('height', value => svgHeight - yScale(value))
      .style('fill', (_value, index) => componentColorer(index))
  }, [principalComponents, eigenvalues])

  return (
    <Card bg="light">
      <Card.Header as="h5">
        Eigenvalues
      </Card.Header>

      <Card.Body>
        <svg ref={svgRef} className="img-fluid w-100" width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth + 60} ${svgHeight}`}>
          <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#eee" />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <HelpButton
          title={Descriptions.EigenvaluesChart.title}
          shorttext={Descriptions.EigenvaluesChart.shortText}
          longtext={Descriptions.EigenvaluesChart.longText}
        />
      </Card.Body>
    </Card>
  )
}

export default EigenvaluesChart
