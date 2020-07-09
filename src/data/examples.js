import React from 'react'

const examples = [
  {
    'title': 'Business Analytics lecture example',
    'description': 'An example very similar to slide set 8, slide 16 of the Business Analytics lecture.',
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
    'title': 'Rotating linear data',
    'description': 'Shows how performing PCA on linear data is essentially just a rotation.',
    'steps': [
      {
        'description': 'The data in this is very linear. Click next to rotate the data such that it aligns horizontally.',
        'data': [
          [-18.72,-10.65],
          [-26.62,-20.47],
          [4.93,0.38],
          [12.03,11.23],
          [28.37,19.52]
        ],
      },
      {
        'description': 'Note that Component 1 barely changed compared to the unrotated data. Also Component 1 and the Scatter Plot now look very similar.',
        'data': [
          [-34, -2],
          [-22, 4],
          [5, -2],
          [16, 4],
          [35, -1],
        ]
      },
      {
        'description': 'Now the data is rotated by exactly 90 degrees. The Eigenvalues and Components are completely unaffected.',
        'data': [
          [-2, -34],
          [4, -22],
          [-2, 5],
          [4, 16],
          [-1, 35],
        ]
      }
    ]
  },
  {
    'title': 'Cluster and outlier',
    'description': 'A cluster of 4 points and 1 outlier',
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
  }
]

export default examples
