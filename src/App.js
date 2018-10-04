import React, {Component} from 'react';
import Pokedex from './components/Pokedex/Pokedex';
import Login from './components/Login/Login';
import Favorites from './components/Favorites/Favorites';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		}
	}

	render() {
		const {user} = this.state;

		return (
			<div className="App">
				{(user && user.username)
				 ? <div>
					 <div>
						 <button onClick={this.signOut}>
							 Sign Out
						 </button>
					 </div>
					 <Pokedex addToFavorites={this.addToFavorites}/>
					 <Favorites pokemons={user ? user.favorites : []}/>
				 </div>
				 : <Login getUser={this.getUser}/>}
			</div>
		);
	}

	componentDidMount() {
		fetch('/api/user', {
			method : 'get',
			headers: {
				'Accept'      : 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => this.setState({user: data}))
			.catch((err) => console.error(err));
	}

	getUser = (user) => {
		this.setState({user});
	};

	addToFavorites = (pokemon) => {
		fetch('/api/add-favorite', {
			method : 'put',
			headers: {
				'Accept'      : 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body   : JSON.stringify({username: this.state.user.username, pokemon: pokemon})
		})
			.then((res) => res.json())
			.then((data) => this.setState({user: data}))
			.catch((err) => console.error(err));
	};

	signOut = () => {
		fetch('/api/signout', {
			method : 'post',
			headers: {
				'Accept'      : 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res)
			.catch((err) => console.error(err));

		this.setState({user: null})
	}
}

export default App;
