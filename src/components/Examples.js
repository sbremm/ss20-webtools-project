import React, { useState } from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import examples from '../data/examples'
import ActiveExample from './ActiveExample'

const Examples = ({ setData }) => {
  const [activeExample, setActiveExample] = useState(null)
  const [exampleStep, setExampleStep] = useState(0)

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
      <ActiveExample
        activeExample={activeExample}
        setActiveExample={setActiveExample}
        exampleStep={exampleStep}
        setExampleStep={setExampleStep}
        setData={setData}
      />
    </>
  )
}

export default Examples
