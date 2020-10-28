import { Grid } from '@material-ui/core';
import NavBar from './components/Layouts/NavBar';
import Table from './components/Table/Table';

function App() {
  const header = [
    {
      text: 'ID',
      value: 'id',
    },
    {
      text: 'Title',
      value: 'title',
    },
    {
      text: 'Body',
      value: 'body',
    },
  ];

  const fetchDataUrl = 'https://jsonplaceholder.typicode.com/posts';
  return (
    <Grid container>
      <NavBar />
      <Grid item xs={12} sm={12} md={12} style={{ padding: '1rem' }}>
        <Table
          headers={header}
          fetchDataUrl={fetchDataUrl}
          title='Posts table'
        />
      </Grid>
    </Grid>
  );
}

export default App;
