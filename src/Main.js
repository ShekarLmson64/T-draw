import React, {useState} from 'react'

function Main() {
    const [candids, setCandids] = useState([])
    const [inputValue, setInputValue] = useState("")
    const handleCandids = () => {
        if(inputValue?.length > 3){
            setCandids([...candids, inputValue])
            inputValue("")
        }
    }
  return (
    <div>
        <input onChange={(e)=>setInputValue(e.target.value)}>{inputValue}</input>
        <button onClick={handleCandids} disabled={inputValue?.length <= 3}>Enter</button>
    </div>
  )
}

export default Main