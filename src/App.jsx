import React from 'react';
import './App.css';
import { Form } from './components/Form';
import { HtmlPre } from './components/HtmlPre';

function App() {


  const [elements,setElements] = React.useState([]);
  
  return (
    <div className="App">
       <Form elements={elements} setElements={setElements}></Form>
       <HtmlPre elements={elements}></HtmlPre>
    </div>
  );
}

export default App;
