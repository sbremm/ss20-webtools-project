import React from 'react'

const examples = [
  {
    'title': 'Business Analytics lecture example',
    'tooltip': 'An example very similar to slide set 8, slide 16 of the Business Analytics lecture.',
    'steps': [
      {
        'description': (
          <>
            The first component is chosen such that its variance is as high as possible.<br />
            Hover your mouse over the &quot;<u>Component 1</u>&quot; graph located under the Eigenvalues graph, to see the residues.
          </>
        ),
        data: [
          [-118.8,-166.9],
          [-139.8,-96.9],
          [-51.8,-124.9],
          [-61.8,-4.9],
          [-7.8,78.1],
          [11.2,-30.9],
          [148.2,183.1],
          [42.2,78.1],
          [81.2,-8.9],
          [97.2,94.1]
        ],
      }
    ]
  },
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
        'data': [[0,0], [-1,-1], [0,1], [-1,0], [-5, 6]],
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
