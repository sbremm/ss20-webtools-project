import React from 'react'

const examples = [
  {
    'title': 'Cluster and outlier',
    'tooltip': 'A cluster of 4 points and 1 outlier',
    'steps': [
      {
        'description': (
          <>
            In this example you can see how an outlier can affect the PCA.<br />
            Click next to remove the outlier.
          </>
        ),
        'data': [[0,0], [-1,-1], [0,1], [-1,0], [16, 8]],
      },
      {
        'description': (
          <>
            The first component has shifted drastically.
          </>
        ),
        'data': [[0,0], [-1,-1], [0,1], [-1,0]],
      }
    ]
  },
  {
    'title': 'Boring',
    'tooltip': 'This example is boring',
    'steps': [
      {
        'description': (
          <>
            This supports <strong>HTML tags</strong> as well.
          </>
        ),
        'data': [[9,-7], [12,3], [-8,-8]],
      },
    ]
  }
]

export default examples
