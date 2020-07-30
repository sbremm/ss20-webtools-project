import React, { useRef, useState } from 'react'
import { Alert, Form, Nav, Navbar, Overlay, Tooltip } from 'react-bootstrap'
import PCA from 'pca-js'

const Menu = ({
  data,
  setData,
  setHighlightedComponent,
  setHighlightedIndex,
  setShowExamplesModal,
  showTooltips,
}) => {
  const exampleLinkRef = useRef()
  const [uploadErrorMessage, setUploadErrorMessage] = useState(null)

  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 20; i++) {
      newData = newData.concat([
        [Math.random() * 200 - 100, Math.random() * 200 - 100],
      ])
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
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      bg="primary"
      variant="dark"
    >
      <Navbar.Brand>Principal Component Analysis</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            ref={exampleLinkRef}
            onClick={() => setShowExamplesModal(true)}
          >
            Examples
          </Nav.Link>
          <Overlay
            target={exampleLinkRef.current}
            show={showTooltips}
            placement="bottom"
          >
            <Tooltip id="tooltip-example">
              Not sure where to start? Pick an example!
            </Tooltip>
          </Overlay>
          <Nav.Link onClick={generateRandomScatterPlot}>
            Generate random data
          </Nav.Link>
          <Nav.Link onClick={() => reset()}>Clear data</Nav.Link>
          {data.length > 0 ? (
            <Nav.Link onClick={() => setData(PCA.computeDeviationMatrix(data))}>
              Center data
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Center data</Nav.Link>
          )}
        </Nav>

        <Nav>
          {uploadErrorMessage ? (
            <Alert variant="danger">{uploadErrorMessage}</Alert>
          ) : (
            ''
          )}
          <Nav.Link
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(data),
            )}`}
            download="data.json"
          >
            Export data
          </Nav.Link>
          <Form>
            <Form.File
              label="Import JSON file"
              custom
              onChange={handleUpload}
            />
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
