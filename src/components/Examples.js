import React, { useState } from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import examples from '../data/examples'

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
          <Card.Footer>
            <Button
              variant="outline-dark"
              block
              onClick={() => {
                setActiveExample(null)
                setData([])
              }}
            >
              Close example
            </Button>
          </Card.Footer>
        </Card>
        :
        ''}
    </>
  )
}

export default Examples
