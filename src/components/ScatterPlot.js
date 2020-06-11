import React, { useEffect, useRef } from 'react'
import { axisBottom, axisRight, event, mouse, scaleLinear, select } from 'd3'
import PCA from 'pca-js'
import componentColorer from '../utils/componentColorer'

const ScatterPlot = ({ data, setData, principalComponents, highlightedIndex, setHighlightedIndex }) => {
  const svgRef = useRef()

  // this executes on page load and every time the data changes
  useEffect(() => {
    const svg = select(svgRef.current)

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
      .range([0, 600])
      .nice()

    const yScale = scaleLinear()
      .domain([minY, maxY])
      .range([0, 600])
      .nice()

    // draw X and Y axis
    const xAxis = axisBottom(xScale)
    svg
      .select('.x-axis')
      .style('transform', 'translateY(600px)')
      .transition()
      .call(xAxis)

    const yAxis = axisRight(yScale)
    svg
      .select('.y-axis')
      .style('transform', 'translateX(600px)')
      .transition()
      .call(yAxis)

    // draw data points
    svg
      .select('.data-points')
      .selectAll('.dataPoint')
      .data(data)
      .join('circle')
      .attr('class', 'dataPoint')
      .attr('r', (_value, index) => index === highlightedIndex ? 5 : 3)
      .style('fill', (_value, index) => index === highlightedIndex ? 'red' : 'black')
      .transition()
      .attr('cx', value => xScale(value[0]))
      .attr('cy', value => yScale(value[1]))

    // data points are deleted on click
    svg
      .select('.data-points')
      .selectAll('.dataPoint')
      .on('click', (_value, index) => {
        event.stopPropagation() // prevents that the same click also adds a data point
        const newData = data.slice()
        newData.splice(index, 1)
        setData(newData)
      })

    // add data point on click
    svg.on('click', () => {
      const mousePosition = mouse(svgRef.current)
      const newDataPoint = [
        xScale.invert(mousePosition[0]),
        yScale.invert(mousePosition[1]),
      ]
      const newData = data.concat([newDataPoint])
      const centeredNewData = PCA.computeDeviationMatrix(newData)
      setData(centeredNewData)
    })

    // set highlighting on mouse over
    svg
      .select('.data-points')
      .selectAll('.dataPoint')
      .on('mouseenter', (_value, index) => {
        setHighlightedIndex(index)
      })
      .on('mouseleave', () => {
        setHighlightedIndex(undefined)
      })

    // draw principal component vectors
    svg
      .select('.principal-components')
      .selectAll('.component')
      .data(principalComponents)
      .join('line')
      .attr('class', 'component')
      .attr('clip-path', 'url(#rect-clip)')
      .attr('stroke-width', 2)
      .attr('stroke', (_value, index) => componentColorer(index))
      .transition()
      .attr('x1', component => xScale(2 * xScale.domain()[0] * component.vector[0]))
      .attr('x2', component => xScale(2 * xScale.domain()[1] * component.vector[0]))
      .attr('y1', component => yScale(2 * yScale.domain()[0] * component.vector[1]))
      .attr('y2', component => yScale(2 * yScale.domain()[1] * component.vector[1]))

  }, [data, setData, principalComponents, setHighlightedIndex, highlightedIndex])

  return (
    <div id="scatterPlot">
      <h3>Scatter Plot</h3>
      <svg ref={svgRef} width="600" height="600" viewBox="0 0 600 600">
        <clipPath id="rect-clip">
          <rect x="0" y="0" width="600" height="600" />
        </clipPath>
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="principal-components" />
        <g className="data-points" />
      </svg>
    </div>
  )
}

export default ScatterPlot
