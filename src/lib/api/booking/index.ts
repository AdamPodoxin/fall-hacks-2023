import {
	QueryDocumentSnapshot,
	collection,
	getDocs,
	query,
	where,
	addDoc,
	Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

export type Booking = {
	startDate: Date;
	endDate: Date;
	houseId: string;
	refugeeUid: string;
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
		} as Booking;
	},
};

export const createBooking = async (booking: Booking) => {
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
