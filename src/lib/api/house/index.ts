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
	id: string;
	address: string;
	location: GeoPoint;
	numberBathrooms: number;
	numberBedrooms: number;
	ownerUid: string;
};

const houseConverter = {
	toFirestore: (house: House) => house,
	fromFirestore: (snapshot: QueryDocumentSnapshot) => {
		const { address, location, numberBathrooms, numberBedrooms, ownerUid } =
			snapshot.data();
		const id = snapshot.id;

		return {
			id,
			address,
			location,
			numberBathrooms,
			numberBedrooms,
			ownerUid,
		};
	},
};

export const getHousesForOwner = async (ownerUid: string) => {
	const housesRef = collection(db, "houses").withConverter(houseConverter);
	const q = query(housesRef, where("ownerUid", "==", ownerUid));

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((doc) => doc.data());
};

export const getAllHouses = async () => {
	const housesRef = collection(db, "houses").withConverter(houseConverter);
	const querySnapshot = await getDocs(housesRef);

	return querySnapshot.docs.map((doc) => doc.data());
};
