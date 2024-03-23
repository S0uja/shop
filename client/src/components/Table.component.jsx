import {useEffect,useState} from 'react'
import {Paper,Button,Box,Table,TableBody,TableCell,IconButton,TableContainer,TableHead,TablePagination,TableRow} from '@mui/material'
import font from '../themes/font.theme'
import Search from './Search.component'
import ChipBar from './ChipBar.component'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TableComponent = (props) => {
  const [page, setPage] = useState(0)
  const [rows,setRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchResult,setSearchResult] = useState(true)
  const [activeSearch,setActiveSearch] = useState('')

  useEffect(() => {
    setRows(props.rows)
  }, [props.rows])

  const handleSearch = (value) => { 
    setActiveSearch(value)
    const filteredRows = props.rows.filter((row) => {
      return Object.keys(row).some(key => {
        const prop = row[key];
        return typeof prop === 'string' && prop.toLowerCase().includes(value.toLowerCase());
      });
    });
    if(filteredRows.length){
      setSearchResult(true)
      setRows(filteredRows)
    }
    else{
      setSearchResult(false)
    }
    
  };

  const cancelSearch = () => {
    handleSearch('')
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}} elevation={0}>
      
      <Box sx={{display:'flex',flexDirection:'column',gap:1,py:2}}>
        <Box sx={{width:'100%',display:'flex',gap:2}}>
          <Search onChange={handleSearch} onClear={cancelSearch}/>
          <Button onClick={props.onCreate} disableElevation color="success" sx={{...font,color:'',borderRadius:2}} variant="contained">Добавить</Button>
          <Button disableElevation disabled color="success" sx={{...font,color:'',borderRadius:2}} variant="contained">Импорт</Button>
        </Box>
        <ChipBar chips={[{value:activeSearch,handleDelete:cancelSearch}]}/>
      </Box>
      
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell
                    sx={{...font}}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                    sx={{...font}}
                    align={'center'}
                >
                  Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !searchResult ? 
              (
                <TableRow >
                    <TableCell colSpan={5} align="center" sx={{...font,color:'#787878',fontSize:'16px',width:'100%',textAlign:'center'}}>
                        Не найдено
                    </TableCell>
                </TableRow>
              )
              :
              (
                rows.length>0 ? 
                (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {props.columns.map((column,index) => {
                              const value = row[column.id]
                              return (
                                  <TableCell sx={{...font,fontWeight:400}} key={index} align={column.align}>
                                    {
                                      column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value
                                    }
                                  </TableCell>
                              )
                            })}
                            <TableCell sx={{...font,display:'flex'}} align={'right'}>
                              <IconButton onClick={()=>props.handleDelete(row.id)}>
                                <DeleteIcon/>
                              </IconButton>
                              <IconButton onClick={()=>props.handleEdit(row.id)}>
                                <EditIcon/>
                              </IconButton>
                            </TableCell>
                        </TableRow>
                        );
                    })                  
                )
                :
                (
                    <TableRow >
                        <TableCell colSpan={5} align="center" sx={{...font,color:'#787878',fontSize:'16px',width:'100%',textAlign:'center'}}>
                            Нет данных
                        </TableCell>
                    </TableRow>
                )
              )
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        labelRowsPerPage={''}
        labelDisplayedRows={function ({ from, to, count }) { return `${from}–${to} из ${count !== -1 ? count : `Более чем ${to}`}`}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        sx={{...font}}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableComponent