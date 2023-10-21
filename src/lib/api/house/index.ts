import {
	GeoPoint,
	QueryDocumentSnapshot,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../firebase";

export type House = {
	address: string;
	location: GeoPoint;
	numberBathrooms: number;
	numberBedrooms: number;
	ownerUid: string;
};

const houseConverter = {
	toFirestore: (house: House) => house,
	fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as House,
};

export const getHousesForOwner = async (ownerUid: string) => {
	const housesRef = collection(db, "houses").withConverter(houseConverter);
	const q = query(housesRef, where("ownerUid", "==", ownerUid));

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((doc) => doc.data());
};
