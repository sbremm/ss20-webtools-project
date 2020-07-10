import React, { useEffect, useState } from 'react'
import './App.css'
import { Col, Row } from 'react-bootstrap'
import PCA from 'pca-js'
import About from './components/About'
import Menu from './components/Menu'
import ComponentN from './components/ComponentN'
import DataTable from './components/DataTable'
import Examples from './components/Examples'
import Footer from './components/Footer'
import ScatterPlot from './components/ScatterPlot'
import EigenvaluesChart from './components/EigenvaluesChart'
import mathHelper from './utils/mathHelper'
import ActiveExample from './components/ActiveExample'

function App () {
  const [data, setData] = useState([])
  const [highlightedComponent, setHighlightedComponent] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [principalComponents, setPrincipalComponents] = useState([])
  const [mean, setMean] = useState([0, 0])
  const [activeExample, setActiveExample] = useState(null)
  const [exampleStep, setExampleStep] = useState(0)
  const [showExamplesModal, setShowExamplesModal] = useState(false)
  const [showTooltips, setShowTooltips] = useState(false)

  // calculcate PCA on data change
  useEffect(() => {
    if (data.length === 0) {
      setPrincipalComponents([])
      return
    }
    const vectors = PCA.getEigenVectors(data)
    setPrincipalComponents(vectors)
    setMean(mathHelper.mean(data))
  }, [data])

  // show tooltips if data is empty
  useEffect(() => {
    if (data.length > 0 || showExamplesModal) setShowTooltips(false)

    setTimeout(() => {
      if (data.length === 0 && !showExamplesModal) setShowTooltips(true)
    }, 750)
  }, [data, showExamplesModal])

  return (
    <div className='w-100 p-3'>
      <Menu
        data={data}
        setData={setData}
        setHighlightedComponent={setHighlightedComponent}
        setHighlightedIndex={setHighlightedIndex}
        setShowExamplesModal={setShowExamplesModal}
        showTooltips={showTooltips}
      />
      <Row>
        <Col sm="12" md="4" lg="4" xl="2">
          <About />
          {activeExample &&
            <ActiveExample
              activeExample={activeExample}
              setActiveExample={setActiveExample}
              exampleStep={exampleStep}
              setExampleStep={setExampleStep}
              setData={setData}
            />
          }
          <Examples
            setActiveExample={setActiveExample}
            setExampleStep={setExampleStep}
            setData={setData}
            showExamplesModal={showExamplesModal}
            setShowExamplesModal={setShowExamplesModal}
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
            showTooltips={showTooltips}
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
            showTooltips={showTooltips}
          />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default App
