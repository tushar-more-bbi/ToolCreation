import React from 'react'

export const EditForm = ({onClose,editStep,setEditStep,rows,setRows,elements,setElements}) => {
    
  //MODAL STYLES
    const modalStyles = {
        position: 'fixed',
        top: '20%',
        left: '5%',
        right:'5%',
        borderRadius: '8px',
        width: 'auto',
        height: 'auto',
        border: '2px solid #000',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //  display: 'flex',
        // justifyContent: 'center',
        //  alignItems: 'center',
        zIndex: 1000,
      };
      
    const modalContentStyles = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
      };
   
    const [editedElement, setEditedElement] = React.useState(`${editStep.element}`); // Store the selected element
    const [editedText, setEditedText] = React.useState(`${editStep.text}`); // Store the text
    const  editedElementObjects = {
      startingBoxWithFullWidth : `<div class="row flex-row">
                    <div class="starting-box" style="width: 98%">
                     <div class="starting-box" style="width: 100%">
                      <p class="text-center">${editedText}</p>
                    </div>
                    </div>
                    </div>`,
      
      startingBox :  `<div class="row flex-row">
              <div class="starting-box">
  
                  <div class="starting-box">
  
                      <p class="text-center">${editedText}
  
  
                
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
                         <p class="text-white text-center">${editedText}</p>
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
                       <p class="text-white text-center">${editedText}
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
                              <p class="text-center">${editedText}
  
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
    
    const handleEditedElement = (e) => {
        setEditedElement(e.target.value);
    }

    const handleEditedText = (e) => {
        setEditedText(e.target.value);
    }
    
   const handleSave = () => { 

     const editedData = {
        id: editStep.id,
        element: editedElement,
        text: editedText,
     }

    setEditStep(editedData); // Update the editStep state with the edited data
     
    const updatedRows = rows.map((row) => {
        if (row.id === editStep.id) {
          return { ...row, ...editedData };
        }
        return row;
      });
  
    setRows(updatedRows);


    const updatedElements = [...elements];
    updatedElements[editStep.id - 1] = editedElementObjects[editedData.element]; // Update the element in the elements array

    // console.log(updatedElements);

    setElements(updatedElements);

    onClose();//Close the modal
    
   }


      

    return (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h4>Edit</h4>

            <form>
                <select value={editedElement} onChange={handleEditedElement}>
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
                <input type="text" name="editedText" value={editedText} onChange={handleEditedText} placeholder='Enter text'/>
            </form>
             
            <button class="btn btn-success btn-sm" onClick={handleSave}><i class="bi bi-save"></i> Save</button>
            <button class="btn btn-secondary btn-sm" onClick={onClose}><i class="bi bi-x-circle"></i> Close</button>
          </div>
        </div>
      );
    
}


