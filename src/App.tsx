import "./styles/App.css";
import { login } from "./lib/api/user";
import { Owner } from "./lib/api/owner";
import { useState } from "react";
import { Refugee } from "./lib/api/refugee";
import OwnerPage from "./components/OwnerPage";
import LandingPage from "./components/LandingPage";
import RefugeePage from "./components/RefugeePage";

function App() {
	const [owner, setOwner] = useState<Owner | null>(null);
	const [refugee, setRefugee] = useState<Refugee | null>(null);

	const [showLandingPage, setShowLandingPage] = useState(true);
	const [showCreateAccount, setShowCreateAccount] = useState(false);

	const logInFlow = async () => {
		const loginResult = await login();

		setShowLandingPage(false);

		if (loginResult === null) {
			setShowCreateAccount(true);
		} else if (loginResult?.userType === "owner") {
			setOwner(loginResult.user);
		} else {
			setRefugee(loginResult.user);
		}
	};

	return (
		<>
			{showLandingPage && <LandingPage logInFlow={logInFlow} />}

			{owner && <OwnerPage owner={owner} />}

			{refugee && <RefugeePage refugee={refugee} />}

			{showCreateAccount && <p>Create Account</p>}
		</>
	);
}

export default App;
