import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import examples from '../data/examples'

const Examples = ({ setActiveExample, setExampleStep, setData, showExamplesModal, setShowExamplesModal }) => {
  const loadExample = (example) => {
    setActiveExample(example)
    setExampleStep(0)
    setData(example.steps[0].data)
    setShowExamplesModal(false)
  }

  return (
    <Modal
      show={showExamplesModal}
      onHide={() => setShowExamplesModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Examples
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {examples.map((example, index) =>
          <Card
            key={index}
            bg="light"
            border="secondary"
            tag="a"
            style={{ cursor: 'pointer' }}
            onClick={() => loadExample(example)}
          >
            <Card.Body>
              <Card.Title>{example.title}</Card.Title>
              <Card.Text>{example.description}</Card.Text>
              <Button
                variant="secondary"
                block
                onClick={() => loadExample(example)}
              >
                Load this example
              </Button>
            </Card.Body>
          </Card>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default Examples
