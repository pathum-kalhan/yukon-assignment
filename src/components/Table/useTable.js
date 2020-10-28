import { useState } from 'react';
import axios from 'axios';

const useTable = ({ setAlert, headers, fetchDataUrl }) => {
  const rowsPerPageOptions = [
    {
      name: '10',
      value: 10,
    },
    {
      name: '15',
      value: 15,
    },
    {
      name: '25',
      value: 25,
    },
    {
      name: 'All',
      value: -1,
    },
  ];

  const [items, setData] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [page, setPage] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await axios.get(fetchDataUrl);

      // get only relevant data

      const headerKeys = headers.map((e) => e.value);
      const items = data.data.map((element) => {
        // for (const [key, value] of Object.entries(element)) {
        //   element[key] = String(element[key]).substring(0, 101);

        //   if (!headerKeys.includes(key)) delete element[key];
        // }

        Object.keys(element).forEach((key) => {
          element[key] = String(element[key]).substring(0, 101);
          if (!headerKeys.includes(key)) delete element[key];
        });

        return element;
      });
      setData(items);
    } catch (error) {
      setAlert({
        showAlert: true,
        severity: 'error',
        message: 'Data loading failed!',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = () => {
    if (rowsPerPage === -1) {
      return items;
    } else {
      return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (e) => setPage(e.target.value);

  const pages = () => {
    const pagesArray = [];
    let count = parseInt(items.length / rowsPerPage, 10);
    if (items.length % rowsPerPage !== 0) count += 1;

    for (let index = 0; index < count; index++) {
      pagesArray.push({
        name: index + 1,
        value: index,
      });
    }
    return pagesArray;
  };

  return {
    rowsPerPageOptions,
    items,
    isLoading,
    loadData,
    rowsPerPage,
    page,
    pages,
    handlePageChange,
    handleRowsChange,
    filteredItems,
  };
};

export default useTable;
