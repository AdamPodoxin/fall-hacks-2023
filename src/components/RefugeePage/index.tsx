import { useEffect, useState } from "react";
import { Refugee } from "../../lib/api/refugee";
import { House, getAllHouses } from "../../lib/api/house";
import { createBooking } from "../../lib/api/booking";

type RefugeePageProps = {
	refugee: Refugee;
};

const HouseView = ({
	house,
	refugeeUid,
}: {
	house: House;
	refugeeUid: string;
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

const RefugeePage = ({ refugee }: RefugeePageProps) => {
	const [houses, setHouses] = useState<House[]>([]);

	const loadHouses = async () => {
		const houses = await getAllHouses();
		setHouses(houses);
	};

	useEffect(() => {
		loadHouses();
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
					/>
				))}
			</div>

			<p>My bookings:</p>
			<div className="bookings">{}</div>
		</>
	);
};

export default RefugeePage;
