import "../styles/form.css";

function Form({ setAddress }: { setAddress: (address: string) => void }) {
	return (
		<form>
			<label>
				<input type="text" onChange={(e) => setAddress(e.target.value)} />
			</label>
		</form>
	);
}

export default Form;
