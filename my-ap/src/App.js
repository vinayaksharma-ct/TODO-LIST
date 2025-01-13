// // import logo from './logo.svg';
// // import './App.css';
// // import {TextRender} from './TextRender.js'
// // function App() {
// //   const [names,setNames]=usestate()
// //   return (
// //     <div className="App">
// //       <TextRender name={'Dummy Name'}/>
// //     </div>
// //   );
// // }

// // export default App;


// If we want to increment value by 1 usinf useref

// import { useRef } from "react";
// import usrf from "./useref"
// // export default function Counter(){
// //   let ref = useref(0);
// //   function handleclick(){
// //     ref.current = ref.current+1;
// //   }
// // }
// export default function  func(){
//   return <usrf/>
// }
// import { useRef } from "react";
// export default function Form(){
//   let ref = useRef(0);
//   function handleclick(){
//     ref.current = ref.current+1;
//     alert('You Clicked' + ref.current + ' times!');

//   }
//   return (
//     <button onClick={handleclick}>
//         Click Me
//     </button>
//   );
// }

// export default function Form(){
//   const inputRef = useRef(null);
//   function handleclick(){
//     inputRef.current.focus();
//   }
//   return (
//     <>
//       <input ref={inputRef}/>
//       <button onClick={handleclick}>
//       Focus the input
//       </button>
//     </>
//   )
// }
// import "./styles.css";


// incrementing using both useref and usestate


import { useState, useEffect, useRef } from "react";

// export default function PreviousStateExample() {
//   const [currentValue, setCurrentValue] = useState(0);
//   const countRef = useRef(0);

//   const handleOnClick = () => {
//     // countRef.current = countRef.current + 1;
//     setCurrentValue(currentValue + 1);
//   };

//   return (
//     <div>
//       <button onClick={handleOnClick}>Click to add 1</button>
//       <p> {currentValue}</p>
//       {/* <p> {countRef.current}</p> */}
//     </div>
//   );
// }

// to show

// import { useState, useRef } from "react";÷
export default function InputExample() {
  const [currentValue, setCurrentValue] = useState("");
  const prevValueRef = useRef("");
  const handleOnChange = (event) => {
    prevValueRef.current = currentValue;
    setCurrentValue(event.target.value);
  };
  const handleOnSubmit = () => {
    console.log("Current Value: ", currentValue);
    console.log("Previous Value: ", prevValueRef.current);
  };
  return (
    <div>
      <input
        type="number"
        value={currentValue}
        onChange={handleOnChange}
        placeholder="Enter a number"
      />
      <button onClick={handleOnSubmit}>Submit</button>
      <p>Current Value: {currentValue}</p>
      <p>Previous Value: {prevValueRef.current}</p>
    </div>
  );
}