  import { useState ,useCallback,useEffect,useRef} from 'react'

  import './App.css'

  function App() {
    const [length,setlength]=useState(8)
    const[numbersallowed,setnumberallowed]=useState(false)
    const[specialcharallowed,setspecialcharallowed]=useState(false)
    const[password,setpassword]=useState('')
    const[copied,setcopied]=useState(false)
    
    const passwordRef=useRef(null)
    const generatePassword=useCallback(()=>{
      let newpass=""
      let strtogenerate="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz"
      let numbers="0123456789"
      let extrachar="$-_#&"
      if (numbersallowed){
        strtogenerate+=numbers
      }
      if (specialcharallowed){
        strtogenerate+=extrachar
      }
      for (let i=0;i<length;i++){
          const index=Math.floor(Math.random()*(strtogenerate.length))
          newpass+=strtogenerate.charAt(index)

      }
      setpassword(newpass)

    },[length,numbersallowed,specialcharallowed]);


    useEffect(()=>{
      generatePassword()
    },[length,numbersallowed,specialcharallowed]);

   let  copytoclipboard=()=>{
       window.navigator.clipboard.writeText(password)
       setcopied(true);
       passwordRef.current.select()
       setTimeout(()=>{
        
        setcopied(false)
        passwordRef.current.setSelectionRange(0, 0);

       },3000);
       
   }


    return (
      
      <>
      
        <input type="text"  id="pass" value={password} placeholder='Password' ref={passwordRef} readOnly></input>
        <button id="tocopy" onClick={copytoclipboard}>{copied?'copied':'copy'}</button>
        <input type="range" id="range" value={length} min={8} max={100} 
        onChange={(e)=>setlength(e.target.value)}></input>
        <label htmlFor="length">Length:{length}</label>
        
        <input type="checkbox" checked={numbersallowed} 
        onChange={()=>setnumberallowed((prev)=>!prev)}
        ></input>
        <label htmlFor='numbers'>Numbers</label>

        <input type="checkbox" checked={specialcharallowed} 
        onChange={(e)=>setspecialcharallowed((prev)=>!prev)}
        ></input>
        <label htmlFor='specialchar'>Special characters</label>

      </>
    )
  }

  export default App
