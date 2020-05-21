import React, { useEffect, useState } from 'react';
import './App.css';
import PCA from 'pca-js'
import DataTable from './components/DataTable'
import ScatterPlot from './components/ScatterPlot'
import PrincipalComponentsChart from './components/PrincipalComponentChart'

function App() {
  const [data, setData] = useState([]);
  const [principalComponents, setPrincipalComponents] = useState([])

  const generateRandomScatterPlot = () => {
    let newData = []
    for (let i = 0; i < 50; i++) {
      newData = newData.concat([[
        Math.random() * 1000 - 500,
        Math.random() * 1000 - 500,
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
    <React.Fragment>
      <div id="header">
        <h1>Webtools für die Lehre</h1>
        <h2>Principal Component Analysis (PCA)</h2>
      </div>
      <div id="buttons">
        <h3>Menu</h3>
        <button onClick={generateRandomScatterPlot}>
          Generate random data
        </button><br />
        <button onClick={() => setData([])}>
          Clear data
        </button>
      </div>
      <ScatterPlot data={data} setData={setData} principalComponents={principalComponents} />
      <PrincipalComponentsChart principalComponents={principalComponents} />
      <DataTable data={data} />
    </React.Fragment>
  );
}

export default App;
