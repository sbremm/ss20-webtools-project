import React  from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import examples from '../data/examples'

const Examples = ({ setActiveExample, setExampleStep, setData }) => {
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
                  setExampleStep(0)
                  setData(example.steps[0].data)
                }}
              >
                {example.title}
              </Button>
            </OverlayTrigger>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default Examples
