import { logInWithGoogle } from "../../firebase";
import { getOwnerByUid } from "../owner";
import { getRefugeeByUid } from "../refugee";

export const login = async () => {
	const user = await logInWithGoogle();

	const owner = await getOwnerByUid(user.uid);
	if (owner !== null) {
		return { userType: "owner", user: owner } as const;
	}

	const refugee = await getRefugeeByUid(user.uid);
	if (refugee !== null) {
		return { userType: "refugee", user: refugee } as const;
	}

	return null;
};
