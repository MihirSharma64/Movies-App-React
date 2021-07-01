import Movies from './Components/Movies';
import About from './Components/About';
import Home from './Components/Home';
import Nav from './Components/Nav';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
	return (
		// {/* <Router>
		//   {/* <Home /> */}
		//     <Route path="/" component={Home}/>
		//     {/* <Movies /> */}
		//     <Route path="/movies" component={Movies}/>
		//     {/* <About /> */}
		//     <Route path="/about" component={About}/>
		//   </Router> */}

		// Above code mei dikkat yeh huyi ki /movies pe jayeneg to home and movies dono render honge, bass movies render hona hxhaiye tha..Similarly, /about pe jaane pe home and about dono render hote hai
		// Aisa isliye kyunki for eg agar "/movies" pe gye to wo dekhta hai ki , "/movies" mei "/" hai-->Yes,to render karado home,"/movies" mei "/about" hai?--> Nhi to isko mat render krao.."/movies" mei "/movies" hai?Yes-> to render karado movies bhi

		// To switch use krenge, unlike roouter jo ki saare paths ke saath matching krta hai aur jo match krjaate hai unko render karadeta h,switch bas tab tak matching krta hai jabtak koi ek maatch na mil jaye,aur 1 match milte hi usko render karadeta hai bass, aur kisi ko nhi

		// <Router>
		// 	<Switch>
		// 		<Route path="/" component={Home} />
		// 		<Route path="/movies" component={Movies} />
		// 		<Route path="/about" component={About} />
		// 	</Switch>
		// </Router>
		// Above code mei bhi dikkat hai, wo yeh ki bas "/" wala render hoga har baar.For eg:jab "/movies" pe gye to wo check krega order wise, to pehle check kiya ki "/movies" mei "/" hai?Yes ,to bas isko render krado

		// To iska ek soltion yeh ki jo sabse chota path hai usko sabse niche shift krdo
		// <Router>
		// 	<Switch>
		// 		<Route path="/movies" component={Movies} />
		// 		<Route path="/about" component={About} />
		// 		<Route path="/" component={Home} />
		// 	</Switch>
		// </Router>
		// Imp--> agar "/moviesss" pe gye to wo "/movies" se match nhi hoyega

		// Another solution is : use exact keyword
		<Router>
			<Nav />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/movies" component={Movies} />
				<Route path="/about" component={About} />
			</Switch>
		</Router>
		// exact yeh ensure krega ki path aur url equal hai ki nhi, pehle "/" != "/movies" to yeh render ni hoga..Phir "/movies" == "/movies" to wo render krado
	);
}

export default App;

// Browser router se routing kicapability aagyi
// Routes create krne ke liye Route ka componenent , har route ke liye ek route banado
