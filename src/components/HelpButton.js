import React, { useState } from 'react'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'


const HelpButton = ({ title, shorttext, longtext }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  return (
    <div className="float-right">
      <OverlayTrigger placement="left" overlay={
        <Tooltip id={'tooltip-left'}>
          <p>{ shorttext }</p>
          <strong>Click to learn more.</strong>
        </Tooltip>
      }>
        <h5>
          <Button variant="primary" size="sm" onClick={handleShow}>Help</Button>
        </h5>
      </OverlayTrigger>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{longtext}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default HelpButton
