import React from 'react'
import { Image } from 'react-bootstrap'

const About = {
  'title': 'About',
  'text': (
    <>
      This website will hopefully help you to get a better understanding of
      the <a href="https://en.wikipedia.org/wiki/Principal_component_analysis">principal component analysis</a> (PCA).<br />
      Pick one of the interactive examples or enter your own data,
      and see how this affects the PCA that is automatically calculated in the background.
    </>
  )
}

const ComponentN = {
  'title': 'Component',
  'shortText': 'This is what the data looks like after reducing from two to one dimension',
  'longText': (
    <>
      This component graph shows the data adjusted for the nth principal component. It is the result of projecting the
      data points onto the principal component vector that you can see in the scatter plot.<br />
      When you hover your mouse over the component graph you will see red lines in the scatter plot. These lines are
      called residues. If the data points in the scatter plot would be moved along the residues onto the component
      vector, you get the exact component graph shown here.
    </>
  )
}

const EigenvaluesChart = {
  'title': 'Eigenvalues',
  'shortText': 'The eigenvalues indicate the significance of the components relative to each other.',
  'longText': (
    <>
      Principal Components are always sorted in order of significance. So the first component will always be
      the one that explains the most data.<br />
      The absolute value of the eigenvalues is not that important. High absolute eigenvalues only indicate that the
      data points are comprised of big numbers.
    </>
  )
}

const ScatterPlot = {
  'title': 'Scatter plot with component vectors',
  'shortText': 'The two colored lines are the principal components vectors.',
  'longText': (
    <>
      <p>
        Lorem ipsum dolor sit amet. ScatterPlot longText. <strong>Bold text</strong>.
      </p>
      <a href="https://reactjs.org/docs/introducing-jsx.html">Learn more about RSX</a><br />
      The following image is embedded using a Bootstrap tag.<br />
      <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/GaussianScatterPCA.svg/500px-GaussianScatterPCA.svg.png" fluid />
    </>
  )
}

export default {
  About,
  ComponentN,
  EigenvaluesChart,
  ScatterPlot,
}
