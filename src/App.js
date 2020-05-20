import React, { useEffect, useState } from 'react';
import './App.css';
import PCA from 'pca-js'
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
    setPrincipalComponents(vectors.map(vector => vector.eigenvalue))
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
      <ScatterPlot data={data} setData={setData} />
      <PrincipalComponentsChart principalComponents={principalComponents} />
      <div id="dataTable">
        <h3>Data</h3>
        <table>
          <tr>
            <th>X</th>
            <th>Y</th>
          </tr>
          {data.map(value =>
            <tr>
              <td>{Number.parseFloat(value[0]).toFixed(2)}</td>
              <td>{Number.parseFloat(value[1]).toFixed(2)}</td>
            </tr>
          )}
        </table>
      </div>
    </React.Fragment>
  );
}

export default App;
