import Navbar from "./components/Navbar";
import Button from "./components/ButtonHero";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import "./styles/App.css";
import "./styles/directory.css";
import { Refugee, registerNewRefugee } from "./lib/api/refugee";

function Directory({
	setRefugee,
	setShowCreateAccount,
}: {
	setRefugee: (refugee: Refugee) => void;
	setShowCreateAccount: (show: boolean) => void;
}) {
	return (
		<>
			<Navbar />
			<div className="main-text-wrapper">
				<h1 className="main-text">Please select your user type</h1>
			</div>
			<div className="options">
				<div className="button-indi">
					<Button
						onClick={async () => {
							const newRefugee = await registerNewRefugee();
							setRefugee(newRefugee);
							setShowCreateAccount(false);
						}}
					>
						<div className="icons">
							<PersonIcon />
						</div>
						{"Refugee"}
					</Button>
				</div>
				<div className="button-indi">
					<Button>
						<div className="icons">
							<HomeIcon scale={20} />
						</div>
						{"Owner"}
					</Button>
				</div>
			</div>
		</>
	);
}

export default Directory;
