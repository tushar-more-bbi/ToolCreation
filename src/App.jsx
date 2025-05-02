import React from 'react';
import './App.css';
import { Form } from './components/Form';
import { HtmlPre } from './components/HtmlPre';

function App() {

  // [{id: 1, element: `<div class="row flex-row">
  //   <div class="starting-box" style="width: 98%">
  //    <div class="starting-box" style="width: 100%">
  //     <p class="text-center">random</p>
  //   </div>
  //   </div>
  //   </div>`, text: "Starting Box"}]


  const [elements,setElements] = React.useState([]);
  
  return (
    <div className="App">
       <Form elements={elements} setElements={setElements}></Form>
       <HtmlPre elements={elements}></HtmlPre>
    </div>
  );
}

export default App;
