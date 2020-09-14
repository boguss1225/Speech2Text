import React, {useState} from 'react';
import './App.css';
import WavColum from './components/wavColum'
import Audio from './components/Audio'
import CSVReader from './components/CSVReader'
import {CSVLink} from 'react-csv'

//TODO: audio file input type restriction 

function App() {
  const [path, setPath] = useState("")
  const [wavNames, setWavNames] = useState([])
  const [text,setText] = useState({fileName:"0", fileContent: "CSV File Contents, Currently there is no matched data from CSV files"})
  const [data,setData] = useState([])
  const [files,setFiles] = useState([])
  var csvData = data
  let newWavNames = []
  let newFilesArray = []
  function hanldeTextChange(e) {
    const {value} = e.target
    setText({fileName:text.fileName, fileContent:value})
}

// save btn click event; save modified text and data to related state
  function handleSaveClick(){
    // use text.fileName state to identify which row to rewrite
    let thisFileName = text.fileName
    let newDataArray = Array.from(data)
    newDataArray.forEach((element)=>{
      let loopedFileName = element[0]
      // locate the position where we want to change the content
      if(thisFileName === loopedFileName){
        element[1] = text.fileContent
        setData(newDataArray)
        setText({fileName:thisFileName,fileContent:element[1]})
        return
      }
    })
  }

  function handleFolderChange(e){
    for (let file of e.target.files){
      if(file.type === "audio/wav" || file.type === "audio/mpeg" ){
        newWavNames.push(file.name)
        setWavNames(newWavNames)
        newFilesArray.push(file)
        setFiles(newFilesArray)
        setPath(URL.createObjectURL(file))
      }
      else{
        return
      }
  }
  }

  // user interface
  return (
    <>
      <div className="text-editor-c">
        <div className ="content-wrap">
          <CSVReader setData = {setData}/> 
          <div className="folder-input-row" >
            <input id="folder" 
                   type="file" 
                   webkitdirectory = "true" 
                   className = "btn-import"
                   onChange = {(e)=>{
                    handleFolderChange(e) 
            }}/>
          </div>
          <textarea className="csv-file-row"
                    value = {text.fileContent}
                    onChange = {hanldeTextChange}>

          </textarea>
        </div>
        <div className="wav-files-col">
          <h2>Audio File List</h2>
          {wavNames.map(wavName=>{
            return <WavColum key ={wavName} 
                             wavName = {wavName}
                             data = {data}
                             audioFiles = {files}
                             setText = {setText}
                             setPath = {setPath}
                             />
          })}
        </div>
      </div>
      <div className = "audio-row">
        <Audio path={path}/>
        <div>        
          <button className = "btn-save" onClick = {handleSaveClick} >Save</button>
          <CSVLink data={csvData}>Download CSV</CSVLink>
        </div>
      </div>
    </>
  );
}

export default App;
