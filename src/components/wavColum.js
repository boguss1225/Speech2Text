import React ,{ useState }from 'react'

export default function WavColum(props) {
    const{wavName,data,audioFiles,setText,setPath} = props
    const thisFileName = wavName.substring(0,wavName.indexOf('.'))
    const [isActive, setIsActive] = useState(false)
    // check whether upload audio file has matched row in CSV file
    function isDataExist(){
        for(let i = 0; i<data.length; i++){
           if(thisFileName === data[i][0]){
               return true
           }
        }
        return false 
    }
    // span Click Event
    function handleSpanClick(Name){
        // if there is no rows that match the audio name in the CSV file, tell user to check the name of both files
        if(!isDataExist()){
            alert('No rows in the CSV file match this audio file name, please make sure both file names match with each ohter')
            return
        }
        // if user haven't upload CSV file, tell the user
        if(data.length == 0){
            alert('Please Upload the CSV file')
            return
        }
        // change target path into the setPath State, React will rerender this component
        for(let i = 0 ; i < audioFiles.length ; i++){
            if(wavName === audioFiles[i].name){
                setPath(URL.createObjectURL(audioFiles[i]))
            }
        }
        //find matched row in CSV file, setText in the textarea to matched content
        for(let i = 0; i < data.length ; i++){
            let fileNameFromCSV = data[i][0]
            let fileContentFromCSV = data[i][1]
            if(thisFileName === fileNameFromCSV){
                setText({fileName:fileNameFromCSV, fileContent:fileContentFromCSV})
            }
        }
        // change style each time span is clicked
        const spans = document.getElementsByTagName('span')
        isActive ? setIsActive(false) : setIsActive(true)        
    }

    return (
      <button className="btn-span"   onClick={()=>handleSpanClick(wavName)}> {wavName} </button>
    )
}
