import React, { useEffect, useRef } from 'react'
import { Paper, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { axisBottom, axisRight, event, mouse, scaleLinear, select } from 'd3'
import PCA from 'pca-js'
import componentColorer from '../utils/componentColorer'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    minWidth: '650px', // does nothing
  },
  svg: {
    backgroundColor: '#f5f5f6',
    overflow: 'visible',
  }
}))

const ScatterPlot = ({ data, setData, principalComponents }) => {
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
      .attr('r', 3)
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

    // draw principal component vectors
    svg
      .select('.principal-components')
      .selectAll('.component')
      .data(principalComponents)
      .join('line')
      .attr('class', 'component')
      .attr('stroke-width', 2)
      .attr('stroke', (_value, index) => componentColorer(index))
      .transition()
      .attr('x1', component => xScale(xScale.domain()[0] * component.vector[0]))
      .attr('x2', component => xScale(xScale.domain()[1] * component.vector[0]))
      .attr('y1', component => yScale(yScale.domain()[0] * component.vector[1]))
      .attr('y2', component => yScale(yScale.domain()[1] * component.vector[1]))

  }, [data, setData, principalComponents])

  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography variant='h4'>Scatter Plot</Typography>
      <svg ref={svgRef} className={classes.svg} width="600" height="600" viewBox="0 0 600 600">
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="principal-components" style={{overflow: 'hidden'}}/>
        <g className="data-points" />
      </svg>
    </Paper>
  )
}

export default ScatterPlot
