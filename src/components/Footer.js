import React from 'react'

const Footer = () => {
  return (
    <div className="text-dark text-center" style={{ padding: '1em', marginBottom: '1em', fontSize: '0.7rem' }}>
      © 2020 Marcus Legendre<br />
      This is free software provided under the <a href="https://github.com/orangefoil/ss20-webtools-project/blob/master/LICENSE.md">MIT License</a>.
      The source code is hosted on <a href="https://github.com/orangefoil/ss20-webtools-project/">GitHub</a>.<br />
      Built using
      Bootstrap (<a href="https://github.com/twbs/bootstrap/blob/main/LICENSE">MIT License</a>),
      D3.js (<a href="https://github.com/d3/d3/blob/master/LICENSE">BSD 3-Clause License</a>),
      pca-js (MIT License),
      React (<a href="https://github.com/facebook/react/blob/master/LICENSE">MIT License</a>),
      React Bootstrap (<a href="https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE">MIT License</a>)
    </div>
  )
}

export default Footer
