import React from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'

const examples = [
  {
    'title': 'One',
    'tooltip': 'This is the first example',
    'data': [[1,2], [2,1], [-1,-2], [-4,-3]]
  },
  {
    'title': 'Two',
    'tooltip': 'This is the second example',
    'data': [[9,-7], [12,3], [-8,-8]]
  }
]

const Examples = ({ setData }) => {
  return (
    <Card>
      <Card.Header as="h3">
        Examples
      </Card.Header>
      <Card.Body>
        {examples.map((example, index) =>
          <OverlayTrigger key={index} placement="right" overlay={
            <Tooltip id={'tooltip-right'}>
              {example.tooltip}
            </Tooltip>
          }>
            <Button
              variant="secondary"
              block
              onClick={() => setData(example.data)}>{example.title}
            </Button>
          </OverlayTrigger>

        )}
      </Card.Body>
    </Card>
  )
}

export default Examples
