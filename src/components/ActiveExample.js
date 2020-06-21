import React from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'

const ActiveExample = ({ activeExample, setActiveExample, exampleStep, setExampleStep, setData }) => {
  const nextExampleStep = () => {
    setData(activeExample.steps[exampleStep + 1].data)
    setExampleStep(exampleStep + 1)
  }

  const previousExampleStep = () => {
    setData(activeExample.steps[exampleStep - 1].data)
    setExampleStep(exampleStep - 1)
  }

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
              <hr />
                Step {exampleStep + 1} of {activeExample.steps.length}
              <ButtonGroup className="float-right">
                <Button
                  variant="secondary"
                  disabled={exampleStep === 0}
                  onClick={() => previousExampleStep()}
                >
                    ⇦ Back
                </Button>
                <Button
                  variant="secondary"
                  disabled={exampleStep + 1 >= activeExample.steps.length}
                  onClick={() => nextExampleStep()}
                >
                    Next ⇨
                </Button>
              </ButtonGroup>
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

export default ActiveExample
