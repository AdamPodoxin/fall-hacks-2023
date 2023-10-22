import {
	GeoPoint,
	QueryDocumentSnapshot,
	addDoc,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db, getCurrentUser } from "../../firebase";

export type Refugee = {
	name: string;
	uid: string;
	location: GeoPoint;
};

const refugeeConverter = {
	toFirestore: (owner: Refugee) => owner,
	fromFirestore: (snapshot: QueryDocumentSnapshot) =>
		snapshot.data() as Refugee,
};

export const getRefugeeByUid = async (uid: string) => {
	const refugeesRef = collection(db, "refugees").withConverter(
		refugeeConverter
	);
	const q = query(refugeesRef, where("uid", "==", uid));

	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		return null;
	} else {
		return querySnapshot.docs[0].data();
	}
};

export const registerNewRefugee = async () => {
	const refugeesRef = collection(db, "refugees").withConverter(
		refugeeConverter
	);

	const currentUser = getCurrentUser();

	const newRefugee: Refugee = {
		name: currentUser!.displayName!,
		uid: currentUser!.uid,
		location: new GeoPoint(0, 0),
	};

	await addDoc(refugeesRef, newRefugee);

	return newRefugee;
};
