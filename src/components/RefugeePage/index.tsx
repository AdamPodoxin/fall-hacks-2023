import { useEffect, useState } from "react";
import { Refugee } from "../../lib/api/refugee";
import { House, getAllHouses } from "../../lib/api/house";
import {
	Booking,
	cancelBooking,
	createBooking,
	getBookingsForRefugee,
} from "../../lib/api/booking";

type RefugeePageProps = {
	refugee: Refugee;
};

const HouseView = ({
	house,
	refugeeUid,
	refreshBookings,
}: {
	house: House;
	refugeeUid: string;
	refreshBookings: () => void;
}) => {
	const [showReserveMenu, setShowReserveMenu] = useState(false);
	const [bookingError, setBookingError] = useState("");
	const [showBookingSuccess, setShowBookingSuccess] = useState(false);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const book = async () => {
		try {
			await createBooking({
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				houseId: house.id,
				refugeeUid,
			});

			setShowBookingSuccess(true);
			refreshBookings();
		} catch (e) {
			if (e instanceof Error) {
				setBookingError(e.message);
			}
		}
	};

	return (
		<>
			<p>Address: {house.address}</p>

			<button onClick={() => setShowReserveMenu(!showReserveMenu)}>
				{showReserveMenu ? "Cancel" : "Book this house"}
			</button>

			{showReserveMenu && (
				<>
					<br />
					<br />
					<br />

					<span>Start date: </span>
					<input
						type="date"
						onChange={(e) => {
							setStartDate(e.target.value);
							setBookingError("");
							setShowBookingSuccess(false);
						}}
					/>

					<br />
					<br />

					<span>End date: </span>
					<input
						type="date"
						min={startDate}
						onChange={(e) => {
							setEndDate(e.target.value);
							setBookingError("");
							setShowBookingSuccess(false);
						}}
					/>

					{bookingError && (
						<>
							<br />
							<br />
							<p style={{ color: "red" }}>{bookingError}</p>
						</>
					)}

					{showBookingSuccess && (
						<>
							<br />
							<br />
							<p style={{ color: "green" }}>Success!</p>
						</>
					)}

					<br />
					<br />
					<br />

					<input type="button" value="Confirm" onClick={book} />
				</>
			)}
		</>
	);
};

const BookingView = ({
	booking,
	house,
	refreshBookings,
}: {
	booking: Booking;
	house: House;
	refreshBookings: () => void;
}) => {
	const cancel = async () => {
		await cancelBooking(booking.id);
		refreshBookings();
	};

	return (
		<>
			<p>Address: {house.address}</p>
			<span>
				{booking.startDate.toDateString()} to {booking.endDate.toDateString()}
			</span>

			<br />

			<input type="button" value="Cancel" onClick={cancel} />

			<br />
			<br />
		</>
	);
};

const RefugeePage = ({ refugee }: RefugeePageProps) => {
	const [houses, setHouses] = useState<House[]>([]);
	const [bookings, setBookings] = useState<Booking[]>([]);

	const loadHouses = async () => {
		const houses = await getAllHouses();
		setHouses(houses);
	};

	const loadBookings = async () => {
		const bookings = await getBookingsForRefugee(refugee.uid);
		setBookings(bookings);
	};

	useEffect(() => {
		loadHouses();
		loadBookings();
	}, []);

	return (
		<>
			<p>{refugee.name}</p>

			<p>Houses available:</p>
			<div className="houses">
				{houses.map((house) => (
					<HouseView
						house={house}
						refugeeUid={refugee.uid}
						key={house.address}
						refreshBookings={loadBookings}
					/>
				))}
			</div>

			<p>My bookings:</p>
			<div className="bookings">
				{bookings.map((booking) => {
					const house = houses.filter(
						(house) => house.id === booking.houseId
					)[0];
					return (
						<BookingView
							booking={booking}
							house={house}
							refreshBookings={loadBookings}
							key={`${booking.houseId}_${booking.startDate}`}
						/>
					);
				})}
			</div>
		</>
	);
};

export default RefugeePage;
