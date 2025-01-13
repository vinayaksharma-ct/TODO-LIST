import { useRef } from "react";
export default function Counter(){
  let ref = useRef(0);
  function handleclick(){
    ref.current = ref.current+1;
    alert('You Clicked' + ref.current + ' times!');

  }
  return (
    <button onClick={handleclick}>
        Click Me
    </button>
  );
}
