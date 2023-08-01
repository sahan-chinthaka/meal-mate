function AboutTab({ data }) {
	return (
		<div>
			<div className="row">
				<div className="col-3">Name</div>
				<div className="col-9">{data.shopName}</div>
			</div>
			<hr />
			<div className="row">
				<div className="col-3">District</div>
				<div className="col-9">{data.district}</div>
			</div>
			<hr />
			<div className="row">
				<div className="col-3">City</div>
				<div className="col-9">{data.city}</div>
			</div>
			<hr />
			<div className="row">
				<div className="col-3">Address</div>
				<div className="col-9">{data.shopAddress}</div>
			</div>
         <hr />
			<div className="row">
				<div className="col-3">Contact</div>
				<div className="col-9">{data.shopContact}</div>
			</div>
		</div>
	);
}

export default AboutTab;
