import React from "react";
import "./form.css";
import { EditForm } from "./editForm";


export const Form = ({ elements, setElements }) => {
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState("");// Store Selected Element
  const [text, setText] = React.useState("");//Store Text
  const [rows, setRows] = React.useState([]); // Store table rows dynamically
  const [resultObj, setresultObj] = React.useState([]); // Store the result object
  const [editStep, setEditStep] = React.useState(null); // Store the step to be edited

  // Element name & their entire HTML code
  const elementObjects = {
    startingBoxWithFullWidth : `<div class="row flex-row">
                  <div class="starting-box" style="width: 98%">
                   <div class="starting-box" style="width: 100%">
                    <p class="text-center">${text}</p>
                  </div>
                  </div>
                  </div>`,
    
    startingBox :  `<div class="row flex-row">
            <div class="starting-box">

                <div class="starting-box">

                    <p class="text-center">${text}


              
                    </p>
                </div>

            </div>
        </div>`    ,       

    arrowDownCenter: `<div class="row flex-row">
                        <div class="col-xs-12 text-center">
                         <i class="fa fa-long-arrow-down"></i>
                        </div>
                      </div>`,
    recommBox: `<div class="row flex-row">
                  <div class="col-xs-12 recomm-box">
                    <a href="javascript:;"></a>
                      <div class="recomm-box-inner ">
                       <p class="text-white text-center">${text}</p>
                      </div>
                  </div>
               </div>`,
    arrowDownStart: `<div class="row flex-row">
                       <div class="col-xs-2 text-center">
                         <i class="fa fa-long-arrow-down"></i>
                       </div>
                       <div class="col-xs-10 text-center">
                         <span class="glyphicon"> </span>
                       </div>
                     </div>`,

    arrowDownEnd: `<div class="row flex-row">
                      <div class="col-xs-10 text-center">
                         <span class="glyphicon"> </span>
                       </div>
                       <div class="col-xs-2 text-center">
                         <i class="fa fa-long-arrow-down"></i>
                       </div>
                     </div>`,              
    optionbox: `<div class="row flex-row">
                  <div class="col-xs-1 text-center">

                    </div>
                      <div class="col-xs-2 text-center">
                        <i class="fa fa-long-arrow-right"></i>
                      </div>
                    <div class="col-xs-9 option-box">
                    <a href="javascript:;">
                    </a>
                    <div class="option-box-inner">
                     <p class="text-white text-center">${text}
                      </p>
                    </div>
                   </div>
                     </div>`,
     questionBox: `<div class="row flex-row">
            <table class="text-center">
                <tbody><tr>
                    <td>
                        <a href="javascript:;">
                            <div class="diamond">
                                <p class="text-center text-primary"><b>YES</b></p>
                            </div>
                        </a>
                    </td>
                    <td> <i class="fa fa-long-arrow-left"></i></td>
                    <td>
                        <div class="decision-box">
                            <p class="text-center">${text}

                            </p>
                        </div>
                    </td>
                    <td> <i class="fa fa-long-arrow-right"></i></td>
                    <td>
                        <a href="javascript:;">
                            <div class="diamond">
                                <p class="text-center text-primary"><b>NO</b></p>
                            </div>
                        </a>
                    </td>
                </tr>
            </tbody></table>
        </div>`                
  };

  const handleSelectedElement = (e) => {
    setSelectedElement(e.target.value);
  };

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new row object
    const newRow = {
      id: rows.length + 1, // Unique ID for Step
      element: selectedElement,
      text: text,
    };


    setElements([...elements, elementObjects[selectedElement]]);

    setresultObj([...resultObj, newRow]);


    setRows([...rows, newRow]); // Append new row to state

    setText(""); // Reset text field after adding
    
  };
 
  const handleDelete = (rowId) => {
    // Remove the row from the rows state
    const updatedRows = rows.filter((r) => r.id !== rowId);
    
    // Remove the corresponding row from resultObj state
    const updatedResultObj = resultObj.filter((r) => r.id !== rowId);
    
    // Remove the corresponding element from setElements state
    const updatedElements = elements.filter((_, index) => index !== rowId - 1); // assuming `rowId` starts from 1 and corresponds to the index
  
    // Update states
    setRows(updatedRows);
    setresultObj(updatedResultObj);
    setElements(updatedElements);
  };

  const handleEdit = (rowId) => {
    const rowToEdit = rows.find((r) => r.id === rowId);
    setEditStep(rowToEdit); // Store the step to be edited
    //Open the modal
    setIsModalOpen(true);
    
    // console.log(rowToEdit);
   
    
  }

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  }


  return (
    <div className="main-form">
      <h3>Create a flow</h3>

      <div className="entire-flow-container">
        <table className="table">
          <colgroup>
            <col width="10%" />
            <col width="75%" />
            <col width="15%" />
          </colgroup>
          <tbody>
            <tr>
              <th>Step ID</th>
              <th>Element Type & Text</th>
              <th>Actions</th>
            </tr>

            {/* Dynamic Rows */}
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  {row.element} - {row.text}
                </td>
                <td>
                  <button
                    class="btn btn-primary btn-sm" 
                    // onClick={() => alert("Edit step " + row.id)}
                    onClick={() => handleEdit(row.id)}
                  >
                    <i class="bi bi-pencil"></i> Edit
                  </button>

                  {isModalOpen && <EditForm onClose={closeModal} editStep={editStep} setEditStep={setEditStep} rows={rows} setRows={setRows} elements={elements} setElements={setElements} elementObjects={elementObjects}/>}

                  <button
                    class="btn btn-danger btn-sm"
                    // onClick={() => {setRows(rows.filter((r) => r.id !== row.id));  setresultObj(resultObj.filter((r) => r.id !== row.id));    }}  
                    onClick={() => handleDelete(row.id)}
                  
                  >
                    <i class="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Form Row */}
            <tr>
              <td>New Step</td>
              <td>
                <form onSubmit={handleSubmit}>
                  <select
                    value={selectedElement}
                    onChange={handleSelectedElement}
                  >
                    <option value="">Select Shape</option>
                    <option value="startingBoxWithFullWidth">startingBoxWithFullWidth</option>
                    <option value="startingBox">startingBox</option>
                    <option value="arrowDownCenter">arrowDownCenter</option>
                    <option value="recommBox">recommBox</option>
                    <option value="arrowDownStart">arrowDownStart</option>
                    <option value="arrowDownEnd">arrowDownEnd</option>
                    <option value="optionbox">optionbox</option>
                    <option value="questionBox">questionBox</option>
                  </select>

                  <input
                    type="text"
                    name="text"
                    value={text}
                    onChange={handleSetText}
                    placeholder="Enter text"
                  />
                </form>
              </td>
              <td>
                <button class="btn btn-success btn-sm" onClick={handleSubmit}>
                  <i class="bi bi-plus-lg"></i> Add Step
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add Step Button */}
      {/* <button class="btn btn-success" onClick={handleSubmit}>
                  <i class="bi bi-plus-lg"></i> Add Step
                </button> */}
    </div>
  );
};
