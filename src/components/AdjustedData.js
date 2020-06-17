import React, { useEffect, useRef } from 'react'
import { Card, ResponsiveEmbed } from 'react-bootstrap'
import { axisBottom, scaleLinear, select } from 'd3'
import PCA from 'pca-js'
import componentColorer from '../utils/componentColorer'
import HelpButton from './HelpButton'

const svgWidth = 315
const svgHeight = 135

const AdjustedData = ({ data, principalComponents, setHighlightedComponent, highlightedIndex, setHighlightedIndex, n }) => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)

    let adjustedData
    try {
      adjustedData = PCA.computeAdjustedData(data, principalComponents[Number(n) - 1]).adjustedData[0]
    } catch (exception) {
      console.error('Handled exception in 3rd party library')
      return
    }

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
      <Card>
        <Card.Header as="h3" style={headerStyle}>
          Component {n}
        </Card.Header>

        <Card.Body>
          <ResponsiveEmbed aspectRatio="21by9">
            <svg ref={svgRef} width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight + 30}`}>
              <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#eee" />
              <g className="x-axis" />
            </svg>
          </ResponsiveEmbed>
          <HelpButton
            title={`Component ${n}`}
            shorttext={`This is what the data looks like after reducing from two to one dimension using component #${n}`}
            longtext="Lorem ipsum dolor sit amet."
          />
        </Card.Body>
      </Card>
    </div>
  )
}

export default AdjustedData
