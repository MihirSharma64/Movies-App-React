import React, {Component} from 'react';
import {getMovies} from './getMovies';
import axios from 'axios';

export default class Movies extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			currSearchText: '',
			currPageNumber: 1,
			limit: 4,
			genres: [{_id: '2321413', name: 'All Genres'}],
			currGenre: 'All Genres', // kyunki backend wale data mei all genres missing h
		};
	}

	async componentDidMount() {
		console.log('component did mount');
		let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
		let genreRes = await axios.get('https://backend-react-movie.herokuapp.com/genres');
		console.log(res);
		this.setState({
			// ab data agaya hai to setstate krdo taaki phirse render hojaye
			movies: res.data.movies,
			genres: [...this.state.genres, ...genreRes.data.genres],
		});
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

		// order set krdiya ab setstate krdo taak irender hojaye phirse

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

		// order set krdiya ab setstate krdo taak irender hojaye phirse

		this.setState({
			movies: this.state.movies,
		});
	};

	handlePageChange = (pageNumber) => {
		this.setState({
			currPageNumber: pageNumber,
		});
	};

	handleLimitChange = (e) => {
		let val = e.target.value;
		this.setState({
			limit: val,
		});
	};

	handleGenreChange = (genreSelected) => {
		this.setState({
			currGenre : genreSelected
		})
	}

	render() {
		console.log('render');
		// deletion is permanent process
		// filtering/searching ek temporary process hai, permanent nhi
		// jab render hoga to dekhenge ki kuch hai kya text field mei,agar hai to filtered arr banalenge
		// baar baar text change hone pe orig arr pe effect nhi hona chahiye
		// field val state to banega hi kyunki uske change pe baar baar jo UI pe show kr rhe hai wo depend krta hai
		// to jab baar baar render hoga uske change ke wajah se tabhi uss val ke acc banalenge temp arr
		// jab re-render hoga text field change hone pe tabhi render process mei filtered arr banalenge acc to text field aur wo show krdenge
		let {movies, currSearchText, currPageNumber, limit, genres, currGenre} = this.state;
		let filteredArr = [];

		if (currSearchText === '') {
			filteredArr = movies;
		} else {
			filteredArr = movies.filter(function (movieObj) {
				let title = movieObj.title.toLowerCase();
				return title.includes(currSearchText.toLowerCase());
			});
		}

		// ----------------------Pagination-------------------------------------------
		// if per page 5(limit) items, 1st page-0to4,2nd page - 5 to 9
		// so Startingidx = limit*(pageNo-1), endIdx = startingidx + limit - 1
		// limit hum user se input lenge to wo change hone pe to structure change hoga hi, to wo state banega
		// currpage number pe bhi depend hoga ki kya show hoga, to yeh bhi state mei jayega, kyunki yeh change hone pe
		// data change hoga jo show ho rha hai abhi
		// Pagination bhi temporary process hi hai, to yeh bhi har render pe jo state ki values hongi uske acc
		// krdenge register

		let numberOfPages = Math.ceil(filteredArr.length / limit);
		let PagesArr = []; // aise hi empty arr hai baad mei pages ke liye map krne ke liye
		for (let i = 0; i < numberOfPages; i++) {
			PagesArr.push(i + 1);
		}

		let si = limit * (currPageNumber - 1);
		let ei = si + limit - 1;

		// Ab si se ei tak slice krdo, slice(si,ei)->ei wala is not included->(1,4):1 se 3 tak ajayenge
		filteredArr = filteredArr.slice(si, ei + 1);

		let prevBtnClass = currPageNumber - 1 > 0 ? 'page-item' : 'page-item disabled';
		let nextBtnClass = currPageNumber + 1 <= PagesArr.length ? 'page-item' : 'page-item disabled';

		return (
			<>
				{/* Loader */}
				{this.state.movies.length === 0 ? (
					<div class="spinner-border" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				) : (
					<div className="container">
						<div className="row">
							{/*Total 12 cols mei divide hoti h*/}
							<div className="col-3">
								<ul className="list-group">
									{genres.map((genre) => {
										let classname = genre.name !== currGenre ? 'list-group-item' : 'list-group-item active';
										return (
											<li
												onClick={() => {
													this.handleGenreChange(genre.name);
												}}
												key={genre._id}
												className={classname}
											>
												{genre.name}
											</li>
										);
									})}
								</ul>
							</div>
							<div className="col-9">
								<input type="search" value={this.state.currSearchText} onChange={this.handleSearchChange}></input>
								<input type="number" value={this.state.limit} onChange={this.handleLimitChange}></input>
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
								<div aria-label="...">
									<ul className="pagination">
										<li
											className={prevBtnClass}
											onClick={() => {
												if (currPageNumber - 1 > 0) this.handlePageChange(currPageNumber - 1);
											}}
										>
											<a className="page-link" href="#" tabindex="-1" aria-disabled="true">
												Previous
											</a>
										</li>
										{PagesArr.map((pageNumber) => {
											let classname = pageNumber === currPageNumber ? 'page-item active' : 'page-item';
											return (
												<li
													key={pageNumber}
													onClick={() => {
														this.handlePageChange(pageNumber);
													}}
													className={classname}
												>
													<a className="page-link" href="#">
														{pageNumber}
													</a>
												</li>
											);
										})}
										<li
											onClick={() => {
												if (currPageNumber + 1 <= PagesArr.length) {
													this.handlePageChange(currPageNumber + 1);
												}
											}}
											className={nextBtnClass}
										>
											<a className="page-link" href="#" tabindex="-1" aria-disabled="true">
												Next
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

// jo getMovies se data le rhe hai wo actual mei, server se aayega.. To jab tak wo aayega tabtak kuch nhi dikha skte
// Sideeffects wali cheeze componeentdidmount mei daalte hai, jaise ki network requests, listener attach
// componentdidmount mei network se request maaregnge aur jab tak wo nhi aya to loader show krdenge

// Axios promise return krta,fetch bhi use krskte the
// kabhi render mei hi setstate krdenge to khulle mei to infinite loop hojayegi, agar kabhi set krna ho to render ke andar to conditoin mei krna, wo bhi avoid krne kei koshish krna
