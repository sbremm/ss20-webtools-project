import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'


const HelpButton = ({ shorttext }) => {
  return (
    <div className="float-right">
      <OverlayTrigger placement="left" overlay={
        <Tooltip id={'tooltip-left'}>
          <p>{ shorttext }</p>
          <strong>Click to learn more.</strong>
        </Tooltip>
      }>
        <h5>
          <Button variant="info" size="sm">Help</Button>
        </h5>
      </OverlayTrigger>
    </div>
  )
}

export default  HelpButton
