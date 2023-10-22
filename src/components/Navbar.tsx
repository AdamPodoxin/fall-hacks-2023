import logo from "../assets/logo.png";
import "../styles/navbar.css";

const Navbar = () => {
	return (
		<>
			<p className="navbar">
				<span>
					<img
						src={logo}
						width={40}
						height={60}
						className="logo"
						alt="Hostas logo"
					/>
				</span>

				<span>
					<a href="#">Home</a>
					<a href="#">Profile</a>
				</span>
			</p>
		</>
	);
};

export default Navbar;
