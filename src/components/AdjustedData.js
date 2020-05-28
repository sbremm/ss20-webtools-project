import React, { useEffect, useRef } from 'react'
import { axisBottom, scaleLinear, select } from 'd3'
import PCA from 'pca-js'
import componentColorer from '../utils/componentColorer'

const AdjustedData = ({ data, principalComponents, n }) => {
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
      .attr('r', 3)
      .style('fill', () => componentColorer(Number(n - 1)))
      .style('stroke', 'black')
      .attr('cy', 25)
      .transition()
      .attr('cx', value => xScale(value))
  }, [data, principalComponents, n])

  return (
    <div>
      <h3>Component {n}</h3>
      <svg ref={svgRef} height="60">
        <g className="x-axis" />
      </svg>
    </div>
  )
}

export default AdjustedData
