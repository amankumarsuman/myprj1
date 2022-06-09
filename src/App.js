import logo from './logo.svg';
import './App.css';
// import Body from './components/body/Body';
import CustomizedTables from './components/table/Table';
import EditForm from './components/editForm/EditForm';

function App() {
  return (
    <div className="App">
     <CustomizedTables/>
     <EditForm/>
    </div>
  );
}

export default App;
