import React from 'react'

const DataTable = ({ data, setData }) => {
  const handleDelete = (index) => {
    return (event) => {
      event.preventDefault()
      setData(data.filter((_v, i) => index !== i))
    }
  }

  const deleteButtonStyle = {
    border: 'none',
    color: 'darkblue',
    cursor: 'pointer',
    display: 'inline',
    margin: 0,
    padding: 0,
  }

  return (
    <div id="dataTable">
      <h3>Data</h3>
      <table>
        <tbody>
        <tr>
          <th>X</th>
          <th>Y</th>
        </tr>
        {data.sort().map((value, index) =>
          <tr key={index}>
            <td>{Number.parseFloat(value[0]).toFixed(2)}</td>
            <td>{Number.parseFloat(value[1]).toFixed(2)}</td>
            <td><button style={deleteButtonStyle} onClick={handleDelete(index)}>[X]</button></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )

}

export default DataTable
