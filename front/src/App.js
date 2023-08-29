import Table from './components/Table';

function App() {
  const foodCodes = [
    {
      "fdcId": 1103070
    },
    {
      "fdcId": 1103071
    },
    {
      "fdcId": 1103072
    },
  ];

  return (
    <div className="App">
      <h1>Tier List</h1>
      <Table data={foodCodes} />
    </div>

  );
}

export default App;
