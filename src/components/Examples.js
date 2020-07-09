import React from 'react'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import examples from '../data/examples'

const Examples = ({ setActiveExample, setExampleStep, setData, showExamplesModal, setShowExamplesModal }) => {
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
      </Modal.Body>
    </Modal>
  )
}

export default Examples
