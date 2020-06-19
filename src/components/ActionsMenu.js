import React, { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import PCA from 'pca-js'

const ActionsMenu = ({ data, setData, setHighlightedComponent, setHighlightedIndex }) => {
  const [uploadErrorMessage, setUploadErrorMessage] = useState(null)

  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 20; i++) {
      newData = newData.concat([[
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
      ]])
    }
    setData(newData)
  }

  const handleUpload = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const newData = JSON.parse(event.target.result)
        setData(newData)
      } catch (exception) {
        setUploadErrorMessage('Unable to parse as JSON file')
        setTimeout(() => setUploadErrorMessage(null), 5000)
      }
    }
    reader.readAsText(file)
  }

  const reset = () => {
    setData([])
    setHighlightedComponent(null)
    setHighlightedIndex(null)
  }

  return (
    <Card>
      <Card.Header as="h3">
        Menu
      </Card.Header>

      <Card.Body>
        <Button variant="secondary" block onClick={generateRandomScatterPlot}>Generate random data</Button>
        <Button variant="secondary" block onClick={() => reset()}>Clear data</Button>
        {data.length > 0 ?
          <Button variant="secondary" block onClick={() => setData(PCA.computeDeviationMatrix(data))}>Center Data</Button> :
          <Button variant="secondary" block disabled>Center Data</Button>
        }
        <Button
          variant="secondary"
          block
          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`}
          download="data.json"
        >
          Export data
        </Button>
        <Form>
          <Form.File
            label="Import JSON file"
            custom
            onChange={handleUpload}
          />
        </Form>
        {
          uploadErrorMessage ?
            <Alert variant="danger">
              {uploadErrorMessage}
            </Alert>
            :
            ''
        }
      </Card.Body>
    </Card>
  )
}

export default  ActionsMenu
