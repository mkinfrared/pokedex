import React, {Component} from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username     : '',
			loginError   : false,
			registerError: false
		};
	}

	render() {
		this.alertError();
		return (
			<div className='login'>
				<input type="text"
					   name='username'
					   value={this.state.username}
					   onChange={this.handleChange}/>
				<button onClick={this.login}>
					Login
				</button>
				<button onClick={this.register}>
					Register
				</button>
			</div>
		);
	}

	handleChange = (ev) => {
		const {value, name} = ev.target;

		this.setState({[name]: value});
	};

	login = () => {
		fetch('/api/login', {
			method : 'post',
			headers: {
				'Accept'      : 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body   : JSON.stringify({username: this.state.username})
		})
			.then((res) => res.json())
			.then((data) => this.props.getUser(data))
			.catch((err) => this.setState({loginError: true}));
	};

	register = () => {
		fetch('/api/register', {
			method : 'post',
			headers: {
				'Accept'      : 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body   : JSON.stringify({username: this.state.username})
		})
			.then((res) => res.json())
			.then((data) => this.props.getUser(data))
			.catch((err) => this.setState({registerError: true}));
	};

	alertError = () => {
		const {loginError, registerError} = this.state;

		if (loginError) {
			alert('User not found');
			this.setState({loginError: false});
		} else if (registerError) {
			alert('Username taken');
			this.setState({registerError: false});
		}
	};
}

export default Login;