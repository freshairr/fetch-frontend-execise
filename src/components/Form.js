import './Form.css';
import { useState, useEffect, useReducer } from 'react';
import { Input, Select, Button, Alert, AlertIcon } from '@chakra-ui/react';

function formReducer(state, event) {
	if (event.reset) {
		return {
			name: '',
			email: '',
			password: '',
			occupation: '',
			state: '',
		};
	}
	return {
		...state,
		[event.name]: event.value,
	};
}

export default function Form() {
	const [formData, setFormData] = useReducer(formReducer, {});
	const [submitting, setSubmitting] = useState(false);
	const [hasError, setError] = useState(undefined);
	const [occupation, setOccupation] = useState([]);
	const [state, setState] = useState([]);

	useEffect(() => {
		fetch('https://frontend-take-home.fetchrewards.com/form')
			.then((response) => response.json())
			.then((data) => {
				setOccupation(data.occupations);
				setState(data.states);
				console.log('Success', data);
			})
			.catch((error) => {
				console.log('error', error);
			});
	}, []);

	function handleChange(event) {
		setFormData({
			name: event.target.name,
			value: event.target.value,
		});
		console.log(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setSubmitting(true);
		console.log(formData);

		try {
			const response = await fetch(
				'https://frontend-take-home.fetchrewards.com/form',
				{
					method: 'POST',
					body: JSON.stringify({
						name: formData.name,
						email: formData.email,
						password: formData.password,
						occupation: formData.occupation,
						state: formData.state,
					}),
					headers: {
						'Content-type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log('sent successfully!', response.status, data);
			setError(false);
			if (!response.ok) {
				setError(true);
				const message = `an error has occured with status code ${response.status}`;
				throw new Error(message);
			}
		} catch (error) {
			setError(true);
			console.error(`something went wrong! ${error.message}`);
		}

		setTimeout(() => {
			setSubmitting(false);
			setFormData({ reset: true });
		}, 1000);
	}

	function SubmitButton() {
		if (
			Object.values(formData).some((x) => x === '') ||
			Object.entries(formData).length !== 5
		) {
			return (
				<Button type="submit" disabled mt="40px">
					Submit
				</Button>
			);
		} else if (submitting && hasError !== undefined) {
			return (
				<Button disabled isLoading loadingText="Submitting..." mt="40px">
					Submitting...
				</Button>
			);
		} else {
			return (
				<Button type="submit" colorScheme="blue" mt="40px">
					Submit
				</Button>
			);
		}
	}

	function Feedback() {
		let success = (
			<Alert status="success" mt="15px">
				<AlertIcon />
				Done! Your info was submitted successfully
			</Alert>
		);

		let error = (
			<Alert status="error" mt="15px">
				<AlertIcon />
				Error! Please try submitting again
			</Alert>
		);

		return hasError === false ? success : hasError === true ? error : null;
	}

	return (
		<>
			<div className="card" style={{ color: 'white' }}>
				<div className="heading">Sign-Up</div>
				<form onSubmit={handleSubmit}>
					<fieldset disabled={submitting}>
						<Input
							name="name"
							onChange={handleChange}
							value={formData.name || ''}
							placeholder="Full Name"
							borderColor="whiteAlpha.400"
						/>
						<Input
							name="email"
							onChange={handleChange}
							value={formData.email || ''}
							placeholder="Email"
							borderColor="whiteAlpha.400"
						/>
						<Input
							name="password"
							type="password"
							onChange={handleChange}
							value={formData.password || ''}
							placeholder="Password"
							borderColor="whiteAlpha.400"
						/>
						<Select
							name="occupation"
							onChange={handleChange}
							value={formData.occupation}
						>
							<option value="" disabled selected>
								Select an Occupation
							</option>
							{occupation.map((item, index) => (
								<option key={index}>{item}</option>
							))}
						</Select>
						<Select name="state" onChange={handleChange} value={formData.state}>
							<option value="" disabled selected>
								Select a State
							</option>
							{state.map((item) => (
								<option key={item.abbreviation}>{item.name}</option>
							))}
						</Select>
						<SubmitButton />
					</fieldset>
				</form>
				<Feedback />
			</div>
		</>
	);
}
