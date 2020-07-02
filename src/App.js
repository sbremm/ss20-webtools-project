import React, { useEffect, useState } from 'react'
import './App.css'
import { Row, Col } from 'react-bootstrap'
import PCA from 'pca-js'
import About from './components/About'
import ActionsMenu from './components/ActionsMenu'
import ComponentN from './components/ComponentN'
import DataTable from './components/DataTable'
import Examples from './components/Examples'
import Footer from './components/Footer'
import Header from './components/Header'
import ScatterPlot from './components/ScatterPlot'
import EigenvaluesChart from './components/EigenvaluesChart'
import mathHelper from './utils/mathHelper'
import ActiveExample from './components/ActiveExample'

function App () {
  const [data, setData] = useState([[0, 0]])
  const [highlightedComponent, setHighlightedComponent] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [principalComponents, setPrincipalComponents] = useState([])
  const [mean, setMean] = useState([0, 0])
  const [activeExample, setActiveExample] = useState(null)
  const [exampleStep, setExampleStep] = useState(0)

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
        <Col sm="12" md="4" lg="4" xl="2">
          <About />
          <ActionsMenu
            data={data}
            setData={setData}
            setHighlightedComponent={setHighlightedComponent}
            setHighlightedIndex={setHighlightedIndex}
          />
          <Examples
            setActiveExample={setActiveExample}
            setExampleStep={setExampleStep}
            setData={setData}
          />
          <ActiveExample
            activeExample={activeExample}
            setActiveExample={setActiveExample}
            exampleStep={exampleStep}
            setExampleStep={setExampleStep}
            setData={setData}
          />
        </Col>
        <Col sm="12" md="8" lg="8" xl="5">
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
        <Col sm="12" md="8" lg="8" xl="3">
          <EigenvaluesChart principalComponents={principalComponents} />
          <div id="singleComponents">
            <ComponentN
              data={data}
              principalComponents={principalComponents}
              setHighlightedComponent={setHighlightedComponent}
              highlightedIndex={highlightedIndex}
              setHighlightedIndex={setHighlightedIndex}
              n="1"
            />
            <ComponentN
              data={data}
              principalComponents={principalComponents}
              setHighlightedComponent={setHighlightedComponent}
              highlightedIndex={highlightedIndex}
              setHighlightedIndex={setHighlightedIndex}
              n="2"
            />
          </div>
        </Col>
        <Col sm="12" md="4" lg="4" xl="2">
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
