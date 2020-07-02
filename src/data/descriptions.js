import React from 'react'
import { Image } from 'react-bootstrap'

const About = {
  'title': 'About',
  'text': 'This text explains the purpose of this website.'
}

const ComponentN = {
  'title': 'Component',
  'shortText': 'This is what the data looks like after reducing from two to one dimension',
  'longText': 'Lorem ipsum dolor sit amet. AdjustedData longText. TODO'
}

const EigenvaluesChart = {
  'title': 'Eigenvalues',
  'shortText': 'The eigenvalues indicate the significance of the components relative to each other.',
  'longText': 'Lorem ipsum dolor sit amet. EigenvaluesChart longText. TODO'
}

const ScatterPlot = {
  'title': 'Scatter plot with component vectors',
  'shortText': (
    <>
      Example using <u>HTML</u>. Although technically this is RSX.
    </>
  ),
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
