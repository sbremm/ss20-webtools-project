import React, { useEffect, useState } from "react";
import "./App.css";
import PCA from "pca-js"
import ScatterPlot from './components/ScatterPlot'
import PrincipalComponentsChart from './components/PrincipalComponentChart'

function App() {
  const [data, setData] = useState([[0, 0]]);
  const [principalComponents, setPrincipalComponents] = useState([0, 0])

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
    const vectors = PCA.getEigenVectors(data)
    setPrincipalComponents(vectors.map(vector => vector.eigenvalue))
  }, [data])

  return (
    <React.Fragment>
      <h1>Webtools für die Lehre</h1>
      <ScatterPlot data={data} />
      <br />
      <button onClick={generateRandomScatterPlot}>
        Generate random scatter plot
      </button>
      <br />
      <PrincipalComponentsChart principalComponents={principalComponents} />
    </React.Fragment>
  );
}

export default App;
