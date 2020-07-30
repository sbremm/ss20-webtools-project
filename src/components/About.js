import React from 'react'
import { Card } from 'react-bootstrap'
import Descriptions from '../data/descriptions'

const About = () => {
  return (
    <Card bg="light">
      <Card.Header as="h5">About</Card.Header>
      <Card.Body>{Descriptions.About.text}</Card.Body>
    </Card>
  )
}

export default About
