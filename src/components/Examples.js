import React from 'react'
import { Button, Card } from 'react-bootstrap'

const examples = [
  {
    'title': 'One',
    'data': [[1,2], [2,1], [-1,-2], [-4,-3]]
  },
  {
    'title': 'Two',
    'data': [[9,-7], [12,3], [-8,-8]]
  }
]

const Examples = ({ setData }) => {
  return (
    <Card>
      <Card.Header as="h3">
        Examples
      </Card.Header>
      <Card.Body>
        {examples.map((example, index) =>
          <Button
            key={index}
            variant="secondary"
            block
            onClick={() => setData(example.data)}>{example.title}
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default Examples
