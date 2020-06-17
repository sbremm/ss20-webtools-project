import React, { useEffect, useRef } from 'react'
import { axisBottom, axisRight, event, mouse, scaleLinear, select } from 'd3'
import componentColorer from '../utils/componentColorer'
import mathHelper from '../utils/mathHelper'

const ScatterPlot = ({ data, setData, principalComponents, highlightedIndex, setHighlightedIndex }) => {
  const svgRef = useRef()

  // this executes on page load and every time the data changes
  useEffect(() => {
    const svg = select(svgRef.current)

    let domainMin = -5
    let domainMax = 5
    if (data.length > 0) {
      domainMin = Math.min(...data.map(value => value[0]), ...data.map(value => value[1])) - 5
      domainMax = Math.max(...data.map(value => value[0]), ...data.map(value => value[1])) + 5
    }

    // create scales that map our data to the fixed size screen space
    const xScale = scaleLinear()
      .domain([domainMin, domainMax])
      .range([0, 600])
      .nice()

    const yScale = scaleLinear()
      .domain([domainMin, domainMax])
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

    // residues
    if (principalComponents[1] && data.length > 1) {
      const componentGradientFunction = mathHelper.vectorToGradientFunction(
        principalComponents[1].vector[0],
        principalComponents[1].vector[1],
        0,
        0,
      )
      // calculate intersections between residues and the principal component
      const intersections = data.map(value => {
        const residueGradientFunction = mathHelper.vectorToGradientFunction(
          principalComponents[1].vector[0],
          principalComponents[1].vector[1],
          value[0],
          value[1],
        )
        return mathHelper.lineIntersection(
          -1 / componentGradientFunction.gradient, // orthogonal from gradient
          componentGradientFunction.c,
          residueGradientFunction.gradient,
          residueGradientFunction.c,
        )
      })

      // draw residues
      svg
        .selectAll('.residue')
        .data(data)
        .join('line')
        .attr('class', 'residue')
        .attr('stroke-width', 1)
        .attr('stroke', 'red')
        .transition()
        .attr('x1', value => xScale(value[0]))
        .attr('y1', value => yScale(value[1]))
        .attr('x2', (_value, index) => xScale(intersections[index][0]))
        .attr('y2', (_value, index) => yScale(intersections[index][1]))
    } else {
      svg
        .selectAll('.residue')
        .remove()
    }

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
      setData(data.concat([newDataPoint]))
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
      .attr('x1', component => xScale(2 * domainMin * component.vector[0]))
      .attr('y1', component => yScale(2 * domainMin * component.vector[1]))
      .attr('x2', component => xScale(2 * domainMax * component.vector[0]))
      .attr('y2', component => yScale(2 * domainMax * component.vector[1]))
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
