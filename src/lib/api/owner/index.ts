import {
	QueryDocumentSnapshot,
	addDoc,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db, getCurrentUser } from "../../firebase";

export type Owner = {
	name: string;
	uid: string;
};

const ownerConverter = {
	toFirestore: (owner: Owner) => owner,
	fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Owner,
};

export const getOwnerByUid = async (uid: string) => {
	const ownersRef = collection(db, "owners").withConverter(ownerConverter);
	const q = query(ownersRef, where("uid", "==", uid));

	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		return null;
	} else {
		return querySnapshot.docs[0].data();
	}
};

export const registerNewOwner = async () => {
	const ownersRef = collection(db, "owners").withConverter(ownerConverter);

	const currentUser = getCurrentUser();

	const newOwner: Owner = {
		name: currentUser!.displayName!,
		uid: currentUser!.uid,
	};

	await addDoc(ownersRef, newOwner);

	return newOwner;
};
