import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@material-ui/core'

const DataTable = ({ data, setData }) => {
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
    console.log(x, y)
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>X</TableCell>
              <TableCell>Y</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sort().map((value, index) =>
              <TableRow key={index}>
                <TableCell>{Number.parseFloat(value[0]).toFixed(2)}</TableCell>
                <TableCell>{Number.parseFloat(value[1]).toFixed(2)}</TableCell>
                <TableCell><button style={deleteButtonStyle} onClick={handleDelete(index)}>[X]</button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <b>Add data point</b>
      <form onSubmit={addDataPoint}>
        X: <input name="x" style={{width: '25px'}}/><br />
        Y: <input name="y" style={{width: '25px'}}/><br />
        <button style={{width: '75px'}}>Add</button>
      </form>
    </div>
  )

}

export default DataTable
