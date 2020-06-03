import React, { useEffect, useState } from 'react'
import './App.css'
import PCA from 'pca-js'
import AdjustedData from './components/AdjustedData'
import DataTable from './components/DataTable'
import ScatterPlot from './components/ScatterPlot'
import PrincipalComponentsChart from './components/PrincipalComponentChart'

function App () {
  const [data, setData] = useState([[0, 0]])
  const [principalComponents, setPrincipalComponents] = useState([])

  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 20; i++) {
      newData = newData.concat([[
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
      ]])
    }
    const centeredNewData = PCA.computeDeviationMatrix(newData)
    setData(centeredNewData)
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
    <React.Fragment>
      <div id="header">
        <h1>Webtools für die Lehre</h1>
        <h2>Principal Component Analysis (PCA)</h2>
      </div>
      <div id="buttons">
        <h3>Menu</h3>
        <button onClick={generateRandomScatterPlot}>Generate random data</button>
        <br />
        <button onClick={() => setData([])}>Clear data</button>
      </div>
      <ScatterPlot data={data} setData={setData} principalComponents={principalComponents} />
      <PrincipalComponentsChart principalComponents={principalComponents} />
      <div id="singleComponents">
        <AdjustedData data={data} principalComponents={principalComponents} n="1" />
        <AdjustedData data={data} principalComponents={principalComponents} n="2" />
      </div>
      <DataTable data={data} setData={setData} />
    </React.Fragment>
  )
}

export default App
