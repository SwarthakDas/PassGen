import { useEffect } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { useState } from "react"

const App = () => {
  const [length,setLength]=useState(10)
  const [number,setNumber]=useState(false)
  const [characters,setCharacters]=useState(false)
  const [password,setPassword]=useState("")
  const passRef=useRef(null)

  const generator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number)str+="1234567890";
    if(characters)str+="!@#$%^&*"
    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,number,characters,setPassword])

  const copyToClipboard=useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    generator()
  },[length,number,characters,generator])

  return (
    <div className="bg-gray-950 h-screen text-white flex flex-col w-full items-center">
      <div className="text-3xl font-bold py-10 flex">
        <p className="text-emerald-200">Pass</p>
        <p className="text-cyan-600">Gen</p>
        </div>
      <div className="flex flex-col bg-blue-950 rounded-xl p-4">
        <div className="">
          <input type="text" readOnly ref={passRef} value={password} placeholder="Password" className="bg-gray-600 rounded-tl-sm rounded-bl-sm px-4 w-xl py-2" />
          <button onClick={copyToClipboard} className="bg-yellow-700 rounded-tr-sm rounded-br-sm py-2 px-4 font-semibold cursor-pointer">Copy</button>
        </div>
        <div className="flex gap-6 pt-4 font-semibold">
          <div className="flex gap-2">
            <input className="cursor-pointer" type="range" min={6} max={50} value={length} onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className="flex gap-1">
            <input className="cursor-pointer" type="checkbox" defaultChecked={number} onChange={()=>{
              setNumber((prev)=>!prev)
            }} />
            <label>Numbers</label>
          </div>
          <div className="flex gap-1">
            <input className="cursor-pointer" type="checkbox" defaultChecked={characters} onChange={()=>{
              setCharacters((prev)=>!prev)
            }} />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
