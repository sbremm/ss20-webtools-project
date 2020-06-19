import React, { useEffect, useState } from 'react'
import './App.css'
import { Row, Col } from 'react-bootstrap'
import PCA from 'pca-js'
import About from './components/About'
import ActionsMenu from './components/ActionsMenu'
import AdjustedData from './components/AdjustedData'
import DataTable from './components/DataTable'
import Examples from './components/Examples'
import Footer from './components/Footer'
import Header from './components/Header'
import ScatterPlot from './components/ScatterPlot'
import EigenvaluesChart from './components/EigenvaluesChart'
import mathHelper from './utils/mathHelper'

function App () {
  const [data, setData] = useState([[0, 0]])
  const [highlightedComponent, setHighlightedComponent] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [principalComponents, setPrincipalComponents] = useState([])
  const [mean, setMean] = useState([0, 0])

  useEffect(() => {
    if (data.length === 0) {
      setPrincipalComponents([])
      return
    }
    const vectors = PCA.getEigenVectors(data)
    setPrincipalComponents(vectors)
    setMean(mathHelper.mean(data))
  }, [data])

  return (
    <div className='w-100 p-3'>
      <Header />
      <Row>
        <Col xs="2" style={{ minWidth: '300px' }}>
          <About />
          <ActionsMenu
            data={data}
            setData={setData}
            setHighlightedComponent={setHighlightedComponent}
            setHighlightedIndex={setHighlightedIndex}
          />
          <Examples setData={setData} />
        </Col>
        <Col lg="5">
          <ScatterPlot
            data={data}
            setData={setData}
            principalComponents={principalComponents}
            mean={mean}
            highlightedComponent={highlightedComponent}
            highlightedIndex={highlightedIndex}
            setHighlightedIndex={setHighlightedIndex}
          />
        </Col>
        <Col lg="3">
          <EigenvaluesChart principalComponents={principalComponents} />
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
      <Footer />
    </div>
  )
}

export default App
