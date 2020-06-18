import React, { useState } from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'

const examples = [
  {
    'title': 'One',
    'tooltip': 'This is the first example',
    'description': 'This is not particularly interesting.',
    'data': [[1,2], [2,1], [-1,-2], [-4,-3]]
  },
  {
    'title': 'Two',
    'tooltip': 'This is the second example',
    'description': 'Lorem ipsum dolor sit amet.',
    'data': [[9,-7], [12,3], [-8,-8]]
  }
]

const Examples = ({ setData }) => {
  const [activeExample, setActiveExample] = useState(null)

  return (
    <>
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
                onClick={() => {
                  setActiveExample(example)
                  setData(example.data)
                }}
              >
                {example.title}
              </Button>
            </OverlayTrigger>
          )}

        </Card.Body>
      </Card>

      {activeExample ?
        <Card>
          <Card.Header as="h3">
              Example: {activeExample.title}
          </Card.Header>
          <Card.Body>
            {activeExample.description}
          </Card.Body>
        </Card>
        :
        ''}
    </>
  )
}

export default Examples
