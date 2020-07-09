import React, { useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'
import { axisBottom, scaleLinear, select } from 'd3'
import PCA from 'pca-js'
import componentColorer from '../utils/componentColorer'
import HelpButton from './HelpButton'
import Descriptions from '../data/descriptions'

const svgWidth = 300
const svgHeight = 80

const ComponentN = ({ data, principalComponents, setHighlightedComponent, highlightedIndex, setHighlightedIndex, n }) => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)

    if (data.length === 0 || principalComponents.length === 0) {
      svg
        .selectAll('.dataPoint')
        .remove()
      return
    }

    const adjustedData = PCA.computeAdjustedData(data, principalComponents[Number(n) - 1]).adjustedData[0]

    // global minimum and maxium for all components
    const min = Math.min(...PCA.computeAdjustedData(data, principalComponents[0]).adjustedData[0], ...PCA.computeAdjustedData(data, principalComponents[1]).adjustedData[0])
    const max = Math.max(...PCA.computeAdjustedData(data, principalComponents[0]).adjustedData[0], ...PCA.computeAdjustedData(data, principalComponents[1]).adjustedData[0])

    // create scales that map our data to the fixed size screen space
    const xScale = scaleLinear()
      .domain([min, max])
      .range([0, svgWidth])
      .nice()
      .clamp(true)

    // draw X axis
    const xAxis = axisBottom(xScale)
    svg
      .select('.x-axis')
      .style('transform', `translateY(${svgHeight / 2 - 5}px)`)
      .transition()
      .call(xAxis)

    // draw data points
    svg
      .selectAll('.dataPoint')
      .data(adjustedData)
      .join('circle')
      .attr('class', 'dataPoint')
      .attr('r', (_value, index) => index === highlightedIndex ? 5 : 3)
      .attr('cy', svgHeight / 2 - 5)
      .style('fill', (_value, index) => index === highlightedIndex ? 'red' : 'black')
      .transition()
      .attr('cx', value => xScale(value))

    // set highlighting on mouse over
    svg
      .selectAll('.dataPoint')
      .on('mouseenter', (_value, index) => {
        setHighlightedIndex(index)
      })
      .on('mouseleave', () => {
        setHighlightedIndex(null)
      })
  }, [data, principalComponents, n, highlightedIndex, setHighlightedIndex])

  const percentageExplained = data.length >= 2 && principalComponents.length >= 2
    ? PCA.computePercentageExplained(principalComponents, principalComponents[Number(n) - 1])
    : 0

  const headerStyle = {
    textDecoration: 'underline',
    textDecorationColor: componentColorer(Number(n - 1)),
    textDecorationThickness: '.15em'
  }

  return (
    <div
      onMouseEnter={() => setHighlightedComponent(n)}
      onMouseLeave={() => setHighlightedComponent(null)}
    >
      <Card bg="light">
        <Card.Header as="h3" style={headerStyle}>
          Component {n}
        </Card.Header>

        <Card.Body>
          <svg ref={svgRef} className="img-fluid w-100" width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth + 10} ${svgHeight}`}>
            <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#eee" />
            <g className="x-axis" />
          </svg>
          Explains {Number(percentageExplained * 100).toFixed(0)}% of the variance.
          <HelpButton
            title={Descriptions.ComponentN.title}
            shorttext={Descriptions.ComponentN.shortText}
            longtext={Descriptions.ComponentN.longText}
          />
        </Card.Body>
      </Card>
    </div>
  )
}

export default ComponentN
