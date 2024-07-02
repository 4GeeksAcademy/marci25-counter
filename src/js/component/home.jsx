import React, { useEffect, useState } from "react";

//include images into your bundle
import { Digit } from "./simpleCounter.jsx";

//create your first component
const Home = () => {

	const [timer, setTimer] = useState(0)
	const [active, setActive] = useState(true)
	const [isCountdown, setIsCountdown] = useState(false)


	useEffect(() => {
        let interval;
        if (active) {
            interval = setInterval(() => {
                setTimer(value => value + 1);
            }, 1000);
        } else if (isCountdown) {
            interval = setInterval(() => {
                setTimer(value => value - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [active, isCountdown]);

	const startStop = () => {
		setActive(value => !value)
	}
	const resetTimer = () => setTimer(value => value = 0)
	const handleChange = e => setTimer(value => value = e.target.value)

	return (
		<div className="text-center">
			<div className="counter-holder">

			<Digit number={<span className="fa fa-clock"></span>}/>
			<Digit number={Math.floor(timer/100000)%10}/>
			<Digit number={Math.floor(timer/10000)%10}/>
			<Digit number={Math.floor(timer/1000)%10}/>
			<Digit number={Math.floor(timer/100)%10}/>
			<Digit number={Math.floor(timer/10)%10}/>
			<Digit number={Math.floor(timer%10)}/>
			</div>
			<div className="container text-center my-5">
				<h2>Counter Controller</h2>
					<div>
						<button disable={active} onClick={startStop} className="mx-1 btn btn-success">Start</button>
						<button disable={!active} onClick={startStop} className="mx-1 btn btn-secondary">Stop</button>
						<button onClick={resetTimer} className="mx-1 btn btn-danger">Reset</button>
					</div>
			</div>
			<div className="container text-center">
				<h2>Countdown</h2>
				<form className="form-control" onSubmit={e=>e.preventDefault()} >
					<input className="form-control" type="number" value={timer} onChange={e=>handleChange(e)}/>
					<div>
					<input 
					disable={isCountdown}
					onClick={()=> setIsCountdown(value => !value)}
					className="my-2 mx-1 btn btn-success" type="submit" value={"start"}/>
					<input 
					disable={!isCountdown}
					onClick={()=> setIsCountdown(value => !value)}
					className="my-2 mx-1 btn btn-secondary" type="submit" value={"stop"}/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Home;
