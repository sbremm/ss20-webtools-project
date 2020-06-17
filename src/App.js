import React, { useEffect, useState } from 'react'
import './App.css'
import {
  Button,
  Row,
  Col, Card,
} from 'react-bootstrap'
import PCA from 'pca-js'
import AdjustedData from './components/AdjustedData'
import DataTable from './components/DataTable'
import ScatterPlot from './components/ScatterPlot'
import PrincipalComponentsChart from './components/PrincipalComponentChart'

function App () {
  const [data, setData] = useState([[0, 0]])
  const [highlightedComponent, setHighlightedComponent] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [principalComponents, setPrincipalComponents] = useState([])

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

  useEffect(() => {
    if (data.length === 0) {
      setPrincipalComponents([])
      return
    }
    const vectors = PCA.getEigenVectors(data)
    setPrincipalComponents(vectors)
  }, [data])

  return (
    <div className='w-100 p-3'>
      <div className="bg-dark text-light text-center" style={{ padding: '1em', marginBottom: '1em' }}>
        <h1>Webtools für die Lehre</h1>
        <h2>Principal Component Analysis (PCA)</h2>
      </div>
      <Row>
        <Col xs="2" style={{ minWidth: '250px' }}>
          <Card>
            <Card.Header as="h3">
              Menu
            </Card.Header>

            <Card.Body>
              <Button variant="outline-dark" block onClick={generateRandomScatterPlot}>Generate random data</Button>
              <br />
              <Button variant="outline-dark" block onClick={() => setData([])}>Clear data</Button><br />
              {data.length > 0 ?
                <Button variant="outline-dark" block onClick={() => setData(PCA.computeDeviationMatrix(data))}>Center Data</Button> :
                <Button variant="outline-dark" block disabled>Center Data</Button>
              }
            </Card.Body>
          </Card>
        </Col>
        <Col lg="5">
          <ScatterPlot
            data={data}
            setData={setData}
            principalComponents={principalComponents}
            highlightedComponent={highlightedComponent}
            highlightedIndex={highlightedIndex}
            setHighlightedIndex={setHighlightedIndex}
          />
        </Col>
        <Col lg="3">
          <PrincipalComponentsChart principalComponents={principalComponents} />
          <div id="singleComponents">
            <AdjustedData
              data={data}
              principalComponents={principalComponents}
              setHighlightedComponent={setHighlightedComponent}
              highlightedIndex={highlightedIndex}
              setHighlightedIndex={setHighlightedIndex}
              n="1"
            />
            <AdjustedData
              data={data}
              principalComponents={principalComponents}
              setHighlightedComponent={setHighlightedComponent}
              highlightedIndex={highlightedIndex}
              setHighlightedIndex={setHighlightedIndex}
              n="2"
            />
          </div>
        </Col>
        <Col lg="2">
          <DataTable
            data={data}
            setData={setData}
            highlightedIndex={highlightedIndex}
            setHighlightedIndex={setHighlightedIndex}
          />
        </Col>
      </Row>
    </div>
  )
}

export default App
