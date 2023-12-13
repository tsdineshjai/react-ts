import "./App.css";
import React, { type FormEvent } from "react";

type obj = {
	id: number;
	goal: string;
	desc: string;
};

type stateType = obj[];
let Objid = 0;

function App() {
	const [state, setState] = React.useState<stateType>([]);
	const [miniState, setminiState] = React.useState<obj>({
		id: ++Objid,
		goal: "",
		desc: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setminiState((prevState) => {
			return {
				...prevState,
				[e.target.name]: e.target.value,
			};
		});
	}

	function handleAddGoal(event: FormEvent) {
		event.preventDefault();
		{
			miniState.goal &&
				miniState.desc &&
				setState((prevState) => {
					return [...prevState, miniState];
				});
		}

		setminiState({
			id: ++Objid,
			goal: "",
			desc: "",
		});
	}
	function handleDelete(key: number) {
		const newState = state.filter((item: obj) => item.id !== key);
		setState(newState);
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "Center",
				alignItems: "start",
				flexDirection: "column",
			}}
		>
			<form onSubmit={(event) => handleAddGoal(event)}>
				<label htmlFor="goal">Goal</label>
				<input
					onChange={(e) => handleChange(e)}
					name="goal"
					type="text"
					value={miniState.goal}
				/>
				<label htmlFor="desc">Description</label>
				<input
					onChange={(e) => handleChange(e)}
					name="desc"
					type="text"
					value={miniState.desc}
				/>

				<button type="submit">Add the goal</button>
			</form>

			<div className="results">
				{state.length < 3 && (
					<p
						style={{
							color: "red",
							fontWeight: "bolder",
							fontSize: "2rem",
						}}
					>
						Warning! you are adding very less life goals, add more and you are
						capable of do anything
					</p>
				)}
				{state.map((item) => (
					<div key={item.id}>
						<h1>{item.goal}</h1>
						<h3>{item.desc}</h3>
						<button onClick={() => handleDelete(item.id)}>delete</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
