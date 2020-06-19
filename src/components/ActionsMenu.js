import React from 'react'
import { Button, Card } from 'react-bootstrap'
import PCA from 'pca-js'

const ActionsMenu = ({ data, setData, setHighlightedComponent, setHighlightedIndex }) => {
  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 20; i++) {
      newData = newData.concat([[
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
      ]])
    }
    setData(newData)
  }

  const reset = () => {
    setData([])
    setHighlightedComponent(null)
    setHighlightedIndex(null)
  }

  return (
    <Card>
      <Card.Header as="h3">
        Menu
      </Card.Header>

      <Card.Body>
        <Button variant="secondary" block onClick={generateRandomScatterPlot}>Generate random data</Button>
        <Button variant="secondary" block onClick={() => reset()}>Clear data</Button>
        {data.length > 0 ?
          <Button variant="secondary" block onClick={() => setData(PCA.computeDeviationMatrix(data))}>Center Data</Button> :
          <Button variant="secondary" block disabled>Center Data</Button>
        }
      </Card.Body>
    </Card>
  )
}

export default  ActionsMenu
