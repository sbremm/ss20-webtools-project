import React, { useEffect, useRef } from 'react'
import { axisBottom, scaleLinear, select } from 'd3'
import PCA from 'pca-js'
import componentColorer from '../utils/componentColorer'

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
      .range([0, 300])
      .nice()
      .clamp(true)

    // draw X axis
    const xAxis = axisBottom(xScale)
    svg
      .select('.x-axis')
      .style('transform', 'translateY(25px)')
      .transition()
      .call(xAxis)

    // draw data points
    svg
      .selectAll('.dataPoint')
      .data(adjustedData)
      .join('circle')
      .attr('class', 'dataPoint')
      .attr('r', (_value, index) => index === highlightedIndex ? 5 : 3)
      .attr('cy', 25)
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
        setHighlightedIndex(undefined)
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
      <h3 style={headerStyle}>Component {n}</h3>
      <svg ref={svgRef} height="60">
        <g className="x-axis" />
      </svg>
    </div>
  )
}

export default AdjustedData
