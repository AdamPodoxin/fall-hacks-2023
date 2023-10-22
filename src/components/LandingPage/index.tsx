import logo from "../../assets/logo.png";
import Button from "../ButtonHero";
import '../../styles/landing.css'
import '../../styles/index.css'

type LandingPageProps = {
	logInFlow: () => void;
};

const LandingPage = ({ logInFlow }: LandingPageProps) => {
	return (
		<>
			<div>
				<a href="" target="_blank">
					<img
						src={logo}
						width={60}
						height={100}
						className="logo"
						alt="Hostas logo"
					/>
				</a>
			</div>
			<h1 className="logo-name">Hosta</h1>
			<div className="card">
				<Button children={"Sign In"}onClick={logInFlow} />
			</div>
			<p className="slogan">Helping refugees turn over a new page</p>
		</>
	);
};

export default LandingPage;
