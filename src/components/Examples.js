import React, { useState } from 'react'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import examples from '../data/examples'

const Examples = ({ setData }) => {
  const [activeExample, setActiveExample] = useState(null)
  const [exampleStep, setExampleStep] = useState(0)

  const nextExampleStep = () => {
    setData(activeExample.steps[exampleStep + 1].data)
    setExampleStep(exampleStep + 1)
  }

  const previousExampleStep = () => {
    setData(activeExample.steps[exampleStep - 1].data)
    setExampleStep(exampleStep - 1)
  }

  const activeExampleCard = () => {
    if (!activeExample) return ''
    return (
      (
        <Card>
          <Card.Header as="h3">
            Example: {activeExample.title}
          </Card.Header>
          <Card.Body>
            {activeExample.steps[exampleStep].description}<br />
            {activeExample.steps.length > 1 ?
              <>
                Step {exampleStep + 1} of {activeExample.steps.length}
                <Button
                  variant="secondary"
                  disabled={exampleStep === 0}
                  onClick={() => previousExampleStep()}
                >
                  Back
                </Button>
                <Button
                  variant="secondary"
                  disabled={exampleStep + 1 >= activeExample.steps.length}
                  onClick={() => nextExampleStep()}
                >
                  Next
                </Button>
              </>
              :
              ''
            }

          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-dark"
              block
              onClick={() => {
                setActiveExample(null)
                setExampleStep(0)
                setData([])
              }}
            >
              Close example
            </Button>
          </Card.Footer>
        </Card>
      )
    )
  }

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
      {activeExampleCard()}
    </>
  )
}

export default Examples
