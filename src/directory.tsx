import { useState } from "react";
import Navbar from "./components/Navbar";
import Button from "./components/ButtonHero";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import "./styles/directory.css";
import { Refugee, registerNewRefugee } from "./lib/api/refugee";
import FormPage from "./formPage";
import { Owner } from "./lib/api/owner";

function Directory({
	setRefugee,
	setOwner,
	setShowCreateAccount,
}: {
	setRefugee: (refugee: Refugee) => void;
	setOwner: (owner: Owner) => void;
	setShowCreateAccount: (show: boolean) => void;
}) {
	const [showOwner, setShowOwner] = useState(false);

	return (
		<>
			{showOwner && (
				<>
					<FormPage
						setOwner={setOwner}
						setShowCreateAccount={setShowCreateAccount}
					/>
				</>
			)}

			{!showOwner && (
				<>
					<Navbar />
					{/* <div className="main-text-wrapper">
						<h1 className="main-text">Please select your user type</h1>
					</div> */}
					<h1>Please select your user type</h1>
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
							<Button onClick={() => setShowOwner(true)}>
								<div className="icons">
									<HomeIcon scale={20} />
								</div>
								{"Owner"}
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Directory;
