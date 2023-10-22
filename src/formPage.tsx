import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Button from "./components/ButtonHero";
import "./styles/App.css";
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
			<Form setAddress={setAddres} />
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
		</>
	);
}

export default FormPage;
