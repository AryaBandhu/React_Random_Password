import { useCallback, useEffect, useState , useRef} from "react";
import "./App.css";

function App() {
  const passwordRef = useRef(null);

  const [password, setPassword] = useState("");
  const [numbercheck, setnumbercheck] = useState(false);
  const [specialchar, setspecialchar] = useState(false);
  const [passrange, setpassrange] = useState("8");

  //For Genrate Random Password
  const passwordGenrater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let special = "!@#$%^&*()_+";

    if (numbercheck) str += num;
    if (specialchar) str += special;

    for (let i = 1; i < passrange; i++) {
      let value = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(value);
    }

    setPassword(pass);
  }, [numbercheck, specialchar, passrange, setPassword]);

  useEffect(() => {
    passwordGenrater();
  }, [passwordGenrater , numbercheck , specialchar , passrange]);

  const copyToClicpboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 40);
    window.navigator.clipboard.writeText(password);
  } , [password])

  return (
    <>
    <div id="main" className="h-full">
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  my-48 bg-gray-800 text-orange-500" id="passdiv">
        <h1 className="text-white text-center my-3 text-2xl font-bold">Password Generator <em className=" text-sm">By Arya Bandhu</em></h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          id="copybtn"
          onClick={copyToClicpboard}>
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={passrange}
              onChange={(e) => {
                setpassrange(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>Length: {passrange}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              onChange={() => {
                setnumbercheck((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              onChange={() => {
                setspecialchar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
