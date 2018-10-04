import React, {Component} from 'react';

class Pokedex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: null,
			id     : 1
		};
	}

	render() {
		const {pokemon} = this.state;

		return (
			<div className='pokedex'>
				<h1>Pokedex</h1>
				{pokemon
				 ? this.renderPokemon()
				 : <div className='pokemon'>
					 <h2>Loading...</h2>
				 </div>}
				<div className='controls'>
					<div className='navigation'>
						<button onClick={this.getPrevPokemon}>Previous</button>
						<button onClick={this.getRandPokemon}>Random</button>
						<button onClick={this.getNextPokemon}>Next</button>
					</div>
					<div className="favorite">
						<button onClick={() => this.props.addToFavorites(pokemon)}>
							Add To Favorite
						</button>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.getRandPokemon();
	}

	renderPokemon = () => {
		const {pokemon} = this.state;

		return (
			<div className="pokemon">
				<h2>{pokemon.name}</h2>
				<div className="pokemon-pic">
					<img src={pokemon.sprites.front_shiny}
						 alt={pokemon}/>
				</div>
				<div className="pokemon-stats">
					<table>
						<thead>
						<tr>
							{pokemon.stats.map((stat, i) => <td key={i}>{stat.stat.name}</td>)}
						</tr>
						</thead>
						<tbody>
						<tr>
							{pokemon.stats.map((stat, i) => <td key={i}>{stat.base_stat}</td>)}
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	getPrevPokemon = () => {
		let id = this.state.id - 1;

		if (id < 1) {
			return;
		}

		fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {method: 'get'})
			.then((res) => res.json())
			.then((data) => this.setState({pokemon: data, id}))
			.catch((err) => console.error(err));
	};

	getNextPokemon = () => {
		let id = this.state.id + 1;

		fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {method: 'get'})
			.then((res) => res.json())
			.then((data) => this.setState({pokemon: data, id}))
			.catch((err) => console.error(err));
	};

	getRandPokemon = () => {
		let id = Math.floor(Math.random() * (330 - 1 + 1)) + 1;

		fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {method: 'get'})
			.then((res) => res.json())
			.then((data) => this.setState({pokemon: data, id}))
			.catch((err) => console.error(err));
	}
}

export default Pokedex;