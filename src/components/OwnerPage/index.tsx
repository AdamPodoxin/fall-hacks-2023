import { useEffect, useState } from "react";
import { Owner } from "../../lib/api/owner";
import { House, getHousesForOwner } from "../../lib/api/house";
import { Booking, getBookingsForHouse } from "../../lib/api/booking";
import { getRefugeeByUid } from "../../lib/api/refugee";

type OwnerPageProps = {
	owner: Owner;
};

type BookingsWithRefugeeName = {
	booking: Booking;
	refugeeName: string;
};

const HouseView = ({ house }: { house: House }) => {
	const [bookings, setBookings] = useState<BookingsWithRefugeeName[]>([]);

	useEffect(() => {
		const loadBookings = async () => {
			const bookings = await getBookingsForHouse(house.id);

			const bookingsWithRefugeeName: BookingsWithRefugeeName[] = [];

			for (const booking of bookings) {
				const refugee = await getRefugeeByUid(booking.refugeeUid);
				bookingsWithRefugeeName.push({
					booking,
					refugeeName: refugee!.name,
				});
			}

			setBookings(bookingsWithRefugeeName);
		};

		loadBookings();
	}, []);

	return (
		<>
			<p>Address: {house.address}</p>

			<p>Bookings:</p>

			<div className="bookings">
				{bookings.map((bookingWithRefugeeName) => {
					return (
						<div key={bookingWithRefugeeName.booking.id}>
							Booked for{" "}
							<span>
								{bookingWithRefugeeName.booking.startDate.toDateString()} to{" "}
								{bookingWithRefugeeName.booking.endDate.toDateString()}
							</span>{" "}
							by {bookingWithRefugeeName.refugeeName}
						</div>
					);
				})}
			</div>
		</>
	);
};

const OwnerPage = ({ owner }: OwnerPageProps) => {
	const [houses, setHouses] = useState<House[]>([]);

	useEffect(() => {
		const loadHouses = async () => {
			const houses = await getHousesForOwner(owner.uid);
			setHouses(houses);
		};

		loadHouses();
	}, []);

	return (
		<>
			<p>{owner.name}</p>

			<p>My houses:</p>
			{houses.map((house) => (
				<HouseView house={house} key={house.address} />
			))}
		</>
	);
};

export default OwnerPage;
