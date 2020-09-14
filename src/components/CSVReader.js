import React from 'react'

import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()


export default function csvReader(props) {
    const {setData} = props

    function handleOpenDialog(e){
        // Note that the ref is set async, so it might be null at some point 
        if (buttonRef.current) {
          buttonRef.current.open(e)
        }
      }
      
    function handleOnFileLoad(data){
        let newData = data.map((element)=>{
          return element.data
        })
        setData(newData)
      }
    
    function handleOnError(err, file, inputElem, reason){

      }
    
    function handleOnRemoveFile(data){
      }
    
    function handleRemoveFile(e){
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e)
        }
      }
    return (
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          onRemoveFile={handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={handleOpenDialog}
                className = "btn-import"
              >
                Choose CSV File
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%'
                }}
              >
                {file && file.name}
              </div>
            </aside>
          )}
        </CSVReader>
      )
}




