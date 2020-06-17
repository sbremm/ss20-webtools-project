import React from 'react'

const DataTable = ({ data, setData, highlightedIndex, setHighlightedIndex }) => {
  const handleDelete = (index) => {
    return (event) => {
      event.preventDefault()
      setData(data.filter((_v, i) => index !== i))
    }
  }

  const addDataPoint = (event) => {
    event.preventDefault()
    const x = Number(event.target.x.value)
    const y = Number(event.target.y.value)
    setData(data.concat([[x, y]]))

    event.target.x.value = ''
    event.target.y.value = ''
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
            <tr
              key={index}
              style={index === highlightedIndex ? { color: 'red' } : {}}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(null)}
            >
              <td>{Number.parseFloat(value[0]).toFixed(2)}</td>
              <td>{Number.parseFloat(value[1]).toFixed(2)}</td>
              <td><button style={deleteButtonStyle} onClick={handleDelete(index)}>[X]</button></td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <b>Add data point</b>
      <form onSubmit={addDataPoint}>
        X: <input name="x" style={{ width: '25px' }}/><br />
        Y: <input name="y" style={{ width: '25px' }}/><br />
        <button style={{ width: '75px' }}>Add</button>
      </form>
    </div>
  )

}

export default DataTable
