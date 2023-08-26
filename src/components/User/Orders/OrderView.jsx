import { useParams } from "react-router-dom";

function OrdereView() {
	const { orderID } = useParams();
	return JSON.stringify(orderID);
}

export default OrdereView;
