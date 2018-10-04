import React from 'react';

const Favorites = (props) => {
	return (
		<div className='favorites'>
			<h2>Favorites</h2>
			<div className='pokemons'>
				{props.pokemons.map((pokemon, i) => (
					<div key={i}>
						<img src={pokemon.sprites.front_shiny} alt={pokemon.name}/>
						<p>{pokemon.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;