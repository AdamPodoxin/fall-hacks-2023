import {
	GeoPoint,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../firebase";

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
