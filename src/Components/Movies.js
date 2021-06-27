import React, {Component} from 'react';
import {getMovies} from './getMovies';

export default class Movies extends Component {
	constructor() {
		super();
		this.state = {
			movies: getMovies(),
			currSearchText: '',
		};
	}

	handleDelete = (id) => {
		let narr = this.state.movies.filter(function (movieObj) {
			return id !== movieObj._id;
		});

		this.setState({
			movies: narr,
		});
	};

	handleSearchChange = (e) => {
		let val = e.target.value;
		this.setState({
			currSearchText: val,
		});
	};

	handleRateSort = (e) => {
		console.log('clicked');
		let className = e.target.className;

		if (className === 'fas fa-caret-up') {
			// Descending
			this.state.movies.sort(function compare(movieObjA, movieObjB) {
				return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
			});
		} else {
			// Ascending
			this.state.movies.sort(function compare(movieObjA, movieObjB) {
				return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
			});
		}

		this.setState({
			movies: this.state.movies,
		});
	};

	handleStockSort = (e) => {
		console.log('clicked');
		let className = e.target.className;

		if (className === 'fas fa-caret-up') {
			// Descending
			this.state.movies.sort(function compare(movieObjA, movieObjB) {
				return movieObjB.numberInStock - movieObjA.numberInStock;
			});
		} else {
			// Ascending
			this.state.movies.sort(function compare(movieObjA, movieObjB) {
				return movieObjA.numberInStock - movieObjB.numberInStock;
			});
		}

		this.setState({
			movies: this.state.movies,
		});
	};

	render() {
		console.log('render');
		// deletion is permanent
		// filtering/searching ek temporary process hai, permanent nhi
		// jab render hoga to dekhenge ki kuch hai kya text field mei,agar hai to filtered arr banalenge
		// baar baar text change hone pe orig arr pe effect nhi hona chahiye
		// field val state to banega hi kyunki uske change pe baar baar jo UI pe show kr rhe hai wo depend krta hai
		// to jab baar baar render hoga uske change ke wajah se tabhi uss val ke acc banalenge temp arr
		// jab re-render hoga text field change hone pe tabhi render process mei filtered arr banalenge acc to text field aur wo show krdenge
		let {movies, currSearchText} = this.state;
		let filteredArr = [];

		if (currSearchText === '') {
			filteredArr = movies;
		} else {
			filteredArr = movies.filter(function (movieObj) {
				let title = movieObj.title.toLowerCase();
				return title.includes(currSearchText.toLowerCase());
			});
		}
		return (
			<div className="container">
				<div className="row">
					{/*Total 12 cols mei divide hoti h*/}
					<div className="col-3"></div>
					<div className="col-9">
						<input type="search" value={this.state.currSearchText} onChange={this.handleSearchChange}></input>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Title</th>
									<th scope="col">Genre</th>
									<th scope="col">
										<i onClick={this.handleStockSort} className="fas fa-caret-up"></i>
										Stock
										<i onClick={this.handleStockSort} className="fas fa-caret-down"></i>
									</th>
									<th scope="col">
										<i onClick={this.handleRateSort} className="fas fa-caret-up"></i>
										Rate
										<i onClick={this.handleRateSort} className="fas fa-caret-down"></i>
									</th>
									<th></th>
								</tr>
							</thead>
							{/* 
									{	
										function abc(){
											return (<h1>Hello</h1>)
										}
										function to bann gya but usko call nhi kr skte to fayead kya, isliye lehte hai ki jsx mei fn declaration not allowed 
										{abc();} // Error
										abc(); // Error
										Bas event ke andar use krskte hai
									}
							 	*/}
							<tbody>
								{filteredArr.map((movieObj) => {
									return (
										<tr key={movieObj._id}>
											{/*React ko identify/differentiate krane ke liye key chahiye hoti h*/}
											<td></td>
											<td>{movieObj.title}</td>
											<td>{movieObj.genre.name}</td>
											<td>{movieObj.numberInStock}</td>
											<td>{movieObj.dailyRentalRate}</td>
											<td>
												{/* Aisa kr nhi skte kyunki function hi call hojayega bina event trigger huye */}
												{/* <button onClick={this.handleDelete(movieObj._id)} type="button" className="btn btn-danger">
													Delete
												</button> */}
												{/*  */}
												{/* To matlab iss fn ko ab dusre fn se call krdenge: */}
												{/* But aisa bhi nhi kr skte kyunki andar wala this undefined hoga */}
												{/* <button onClick={function(){
													this.handleDelete(movieObj._id)}} type="button" className="btn btn-danger">
													Delete
												</button> */}
												{/* To this ko set krdo uske bhaar wale ke equal using arrow fn */}
												<button
													onClick={() => {
														this.handleDelete(movieObj._id);
													}}
													type="button"
													className="btn btn-danger"
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
