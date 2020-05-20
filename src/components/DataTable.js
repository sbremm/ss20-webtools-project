import React from 'react'

const DataTable = ({ data }) => {
  return (
    <div id="dataTable">
      <h3>Data</h3>
      <table>
        <tr>
          <th>X</th>
          <th>Y</th>
        </tr>
        {data.sort().map(value =>
          <tr>
            <td>{Number.parseFloat(value[0]).toFixed(2)}</td>
            <td>{Number.parseFloat(value[1]).toFixed(2)}</td>
          </tr>
        )}
      </table>
    </div>
  )

}

export default DataTable
