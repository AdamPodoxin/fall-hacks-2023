import {
	QueryDocumentSnapshot,
	collection,
	getDocs,
	query,
	where,
	addDoc,
	Timestamp,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export type Booking = {
	startDate: Date;
	endDate: Date;
	houseId: string;
	refugeeUid: string;
	id: string;
};

const bookingConverter = {
	toFirestore: (booking: Booking) => ({
		startDate: Timestamp.fromDate(booking.startDate),
		endDate: Timestamp.fromDate(booking.endDate),
		houseId: booking.houseId,
		refugeeUid: booking.refugeeUid,
	}),
	fromFirestore: (snapshot: QueryDocumentSnapshot) => {
		const data = snapshot.data();

		return {
			startDate: (data["startDate"] as Timestamp).toDate(),
			endDate: (data["endDate"] as Timestamp).toDate(),
			houseId: data["houseId"],
			refugeeUid: data["refugeeUid"],
			id: snapshot.id,
		} as Booking;
	},
};

export const createBooking = async (booking: Omit<Booking, "id">) => {
	const bookingsRef = collection(db, "bookings").withConverter(
		bookingConverter
	);

	const houseIdQuery = query(
		bookingsRef,
		where("houseId", "==", booking.houseId)
	);

	const bookingsForHouse = (await getDocs(houseIdQuery)).docs.map((doc) =>
		doc.data()
	);

	bookingsForHouse.forEach((existingBooking) => {
		const isDateInExistingBooking = (date: Date) => {
			return (
				existingBooking.startDate <= date && date <= existingBooking.endDate
			);
		};

		if (booking.startDate > booking.endDate) {
			throw new Error("Booking start date has to be before end date");
		}

		if (
			isDateInExistingBooking(booking.startDate) ||
			isDateInExistingBooking(booking.endDate)
		) {
			throw new RangeError("A booking at this time already exists");
		}
	});

	await addDoc(bookingsRef, booking);
};

export const getBookingsForRefugee = async (refugeeUid: string) => {
	const bookingsRef = collection(db, "bookings").withConverter(
		bookingConverter
	);
	const q = query(bookingsRef, where("refugeeUid", "==", refugeeUid));

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((doc) => doc.data());
};

export const cancelBooking = async (id: string) => {
	await deleteDoc(doc(db, "bookings", id));
};
