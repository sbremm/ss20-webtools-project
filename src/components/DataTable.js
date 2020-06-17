import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
} from 'react-bootstrap'

const DataTable = ({ data, setData, highlightedIndex, setHighlightedIndex }) => {
  const handleDelete = (index) => {
    return (event) => {
      event.preventDefault()
      setData(data.filter((_v, i) => index !== i))
    }
  }

  const addDataPoint = (event) => {
    event.preventDefault()
    const x = Number(event.target.x.value)
    const y = Number(event.target.y.value)
    setData(data.concat([[x, y]]))

    event.target.x.value = ''
    event.target.y.value = ''
  }

  return (
    <Card>
      <Card.Header as="h3">
        Data
      </Card.Header>

      <Card.Body>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>X</th>
              <th>Y</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.sort().map((value, index) =>
              <tr
                key={index}
                style={index === highlightedIndex ? { color: 'red' } : {}}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(null)}
              >
                <td>{Number.parseFloat(value[0]).toFixed(2)}</td>
                <td>{Number.parseFloat(value[1]).toFixed(2)}</td>
                <td><Button variant="link" size="sm" onClick={handleDelete(index)}>[X]</Button></td>
              </tr>
            )}
          </tbody>
        </Table>

        <h5>Add data point</h5>
        <Form onSubmit={addDataPoint}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">X</Form.Label>
            <Col sm="10">
              <Form.Control type="text" name="x" placeholder="0.00" />
            </Col>
            <Form.Label column sm="2">Y</Form.Label>
            <Col sm="10">
              <Form.Control type="text" name="y" placeholder="0.00" />
            </Col>
            <Col sm="12">
              <Button variant="secondary" block type="submit">Add</Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>

    </Card>
  )
}

export default DataTable
