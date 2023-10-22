import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Button from "./components/ButtonHero";
import "./styles/App.css";
import "./styles/formPage.css"
import { useState } from "react";
import { Owner, registerNewOwner } from "./lib/api/owner";
import { createNewHouse } from "./lib/api/house";

function FormPage({
	setOwner,
	setShowCreateAccount,
}: {
	setOwner: (owner: Owner) => void;
	setShowCreateAccount: (show: boolean) => void;
}) {
	const [address, setAddres] = useState("");

	return (
		<>
			<Navbar />
			<div className="body">
				<h2 className='main-text'>
					Please enter your hosting home address below
				</h2>
				<div className='form'>
					<Form setAddress={setAddres} />
				</div>
				<div className='button'>
					<Button
						onClick={async () => {
							const newOwner = await registerNewOwner();
						
							await createNewHouse({ address, ownerUid: newOwner.uid });
						
							setOwner(newOwner);
							setShowCreateAccount(false);
						}}
						>
						{"Submit"}
					</Button>
				</div>
			</div>
		</>
	);
}

export default FormPage;
