import Feed from '../tutorial/Feed';
import { useContext } from 'react';
import DataContext from '../context/DataContext'
import {useState,useRef} from "react";
/*https://www.youtube.com/watch?v=s6UAuFzL308*/
const ReactTimer = () => {

    const [randomInput,setRandomInput] = useState('');
    const [seconds,setSeconds] = useState(0);
    const renders = useRef(0);
    const inputRef = useRef();
    const timerId = useRef();

    const handleChange = (e) =>{
        setRandomInput(e.target.value);
        renders.current++;
    }
    const focusOnInput = () =>{
        /* 주의사항이 있는데
        * Dom의 element를 useRef로 접근하지 말라.
        * 다
        * 정말 필요할 때, useRef를 사용하는 것이다.
        * */
        inputRef.current.focus();
    }

    const startTimer = ()=>{
        timerId.current = setInterval( ()=>{
            renders.current++;
            setSeconds(prev => prev + 1);
        },1000)
    }

    const stopTimer = () => {
        clearInterval(timerId.current);
        timerId.current = null;
    }

    const resetTimer = () =>{
        stopTimer();
        if(seconds){
            renders.current++;
            setSeconds(0);
        }
    }

    return (
        <main className="Home">

            <input
                ref={inputRef}
                type={"text"}
                value={randomInput}
                placeholder={"Random Input"}
                onChange={handleChange}
            />

            <p>Renders : {renders.current}</p>
            <br/><br/>
            {/* <button onClick={focusOnInput}>Focus</button>*/}
            <section>
                <button onClick={startTimer}> Start Timer</button>
             <button onClick={stopTimer}> Stop Timer</button>
            <button onClick={resetTimer}> Reset Timer</button>
            </section>
            <br/><br/>
            <p> Seconds: {seconds}</p>
            <p>{randomInput}</p>
        </main>
    )
}

export default ReactTimer