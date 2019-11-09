import React, { useState, useEffect } from 'react';
import Table from './Table'
import rushing from './rushing.json'

import './App.css';

function App() {
  let cols = [];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(rushing);

    const keys = Object.keys(rushing[0])

    for (let k of keys) {
      cols.push({ Header: k, accessor: k });
    }
  }, [])

  const columns = React.useMemo(
    () =>
    [{ columns: cols }],
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} data={data} setLoading={setLoading} />
      </header>
    </div>
  );
}

export default App;
