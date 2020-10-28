import React, { useEffect, useState, Fragment } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Spinner from '../Layouts/Spinner';

import './table.scss';

import useTable from './useTable';

export default function TableComponent({ headers, fetchDataUrl, title }) {
  //alerting
  const [alert, setAlert] = useState({
    showAlert: false,
    severity: 'success',
    message: '',
  });

  const {
    rowsPerPageOptions,
    isLoading,
    loadData,
    rowsPerPage,
    page,
    filteredItems,
    handlePageChange,
    handleRowsChange,
    pages,
  } = useTable({
    setAlert,
    headers,
    fetchDataUrl,
  });
  //load data

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid container spacing={1} className="padding">
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <CardHeader title={title} className='card__header' />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead className='table__header'>
                      <TableRow>
                        {headers.map((header) => (
                          <TableCell key={header.text}>{header.text}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredItems().map((item) => {
                        return (
                          <TableRow key={item.id}>
                            {Object.values(item).map((rowItem, index) => (
                              <TableCell key={index}>{rowItem}</TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className='pagination'>
                  <span>Rows per page</span>
                  <Select
                    onChange={handleRowsChange}
                    value={rowsPerPage}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    variant='outlined'
                    name='Rows per page'
                  >
                    {rowsPerPageOptions.map((e, i) => (
                      <MenuItem value={e.value} key={e.value}>
                        {e.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {rowsPerPage !== -1 && (
                    <Fragment>
                      <span>Page</span>
                      <Select
                        onChange={handlePageChange}
                        value={page}
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        variant='outlined'
                        name='Page'
                      >
                        {pages().map((e, i) => (
                          <MenuItem value={e.value} key={e.value}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Fragment>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {alert.showAlert && (
              <Alert
                severity={alert.severity}
                onClose={() =>
                  setAlert({
                    ...alert,
                    showAlert: false,
                  })
                }
              >
                {alert.message}
              </Alert>
            )}
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
}
