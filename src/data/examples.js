import React from 'react'

const examples = [
  {
    'title': 'Cluster and outlier',
    'tooltip': 'A cluster of 4 points and 1 outlier',
    'description': (
      <>
        In this example you can see how an outlier can affect the PCA.<br />
        Click on the outlier to remove it. You will see that the first component changes drastically.
      </>
    ),
    'data': [[0,0], [-1,-1], [0,1], [-1,0], [16, 8]]
  },
  {
    'title': 'Boring',
    'tooltip': 'This example is boring',
    'description': 'There is nothing particularly interesting about this example.',
    'data': [[9,-7], [12,3], [-8,-8]]
  }
]

export default examples
