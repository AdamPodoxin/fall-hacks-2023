import {
	GeoPoint,
	QueryDocumentSnapshot,
	addDoc,
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { time } from "console";

export type House = {
	id: string;
	address: string;
	location: GeoPoint;
	numberBathrooms: number;
	numberBedrooms: number;
	ownerUid: string;
};

const houseConverter = {
	toFirestore: (house: Omit<House, "id">) => house,
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

export const createNewHouse = async ({
	address,
	ownerUid,
}: {
	address: string;
	ownerUid: string;
}) => {
	const housesRef = collection(db, "houses").withConverter(houseConverter);

	await addDoc(housesRef, {
		address,
		ownerUid,
		location: new GeoPoint(0, 0),
		numberBathrooms: 1,
		numberBedrooms: 1,
		id: `${ownerUid}_${address}_${Date.now()}`,
	});
};
