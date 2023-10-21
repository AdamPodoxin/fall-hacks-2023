import { useEffect, useState } from "react";
import { Owner } from "../../lib/api/owner";
import { House, getHousesForOwner } from "../../lib/api/house";

type OwnerPageProps = {
	owner: Owner;
};

const HouseView = ({ house }: { house: House }) => {
	return (
		<>
			<p>Address: {house.address}</p>
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
