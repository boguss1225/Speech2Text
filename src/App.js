import React, {useState} from 'react';
import './App.css';
import WavColum from './components/wavColum'
import Audio from './components/Audio'
import CSVReader from './components/CSVReader'
function App() {
  const [path, setPath] = useState("")
  const [wavNames, setWavNames] = useState([])
  const [text,setText] = useState("CSV File Contents, Currently there is no matched data from CSV files")
  const [data,setData] = useState([])
  const [files,setFiles] = useState([])
  
  let newWavNames = []
  let newFilesArray = []
  function hanldeTextChange(e) {
    const {value} = e.target
    setText(value)
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
      console.log(file.type)
      if(file.type === "application/vnd.ms-excel" || file.name){

      }
  }
  }

  return (
    <>
      <div className="text-editor-c">
        <div className ="content-wrap">
          <CSVReader setData = {setData}/> 
          <div className="folder-input-row" >
            <input id="folder" type="file" webkitdirectory = "true" onChange = {(e)=>{
              handleFolderChange(e) 
            }}/>
          </div>
          <textarea className="csv-file-row"
                    value = {text}
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
        <button className = "btn-save">save</button>
      </div>
    </>
  );
}

export default App;
