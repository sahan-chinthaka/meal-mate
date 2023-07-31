import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./review.scss";
import { collection, doc, getCountFromServer, getDoc, setDoc } from "firebase/firestore";
import { FS } from "../../../firebase";
import { useAuth } from "../../../Context/AuthContext";

function Reviews({ shopID }) {
	const [myReviewCount, setMyReviewCount] = useState(0);
	const [myReview, setMyReview] = useState("");
	const [reviewState, setReviewState] = useState(0); // 0: Loading, 1: No review, 2: Has review
	const [dis, setDis] = useState(false);
	const [reviewCount, setReviewCount] = useState(0);
	const auth = useAuth();

	useEffect(() => {
		const dc = doc(FS, "shops", shopID, "reviews", auth.user.uid);
		getDoc(dc)
			.then((snap) => {
				const d = snap.data();
				setMyReviewCount(d.rate);
				setMyReview(d.review);
				setReviewState(2);
			})
			.catch(() => setReviewState(1));

		const c = collection(FS, "shops", shopID, "reviews");
		getCountFromServer(c).then((snap) => setReviewCount(snap.data().count));
	}, []);

	function writeReview() {
		const c = doc(FS, "shops", shopID, "reviews", auth.user.uid);
		setDis(true);

		setDoc(c, {
			review: myReview,
			rate: myReviewCount,
		}).finally(() => {
			setDis(false);
			setReviewState(2);
		});
	}

	return (
		<div className="reviews-tab">
			<div className="my-review">
				<div className="star-holder">
					<span onClick={() => setMyReviewCount(1)}>
						{myReviewCount >= 1 ? <AiFillStar size="30" fill="green" /> : <AiOutlineStar color="green" size="30" />}
					</span>
					<span onClick={() => setMyReviewCount(2)}>
						{myReviewCount >= 2 ? <AiFillStar size="30" fill="green" /> : <AiOutlineStar color="green" size="30" />}
					</span>
					<span onClick={() => setMyReviewCount(3)}>
						{myReviewCount >= 3 ? <AiFillStar size="30" fill="green" /> : <AiOutlineStar color="green" size="30" />}
					</span>
					<span onClick={() => setMyReviewCount(4)}>
						{myReviewCount >= 4 ? <AiFillStar size="30" fill="green" /> : <AiOutlineStar color="green" size="30" />}
					</span>
					<span onClick={() => setMyReviewCount(5)}>
						{myReviewCount >= 5 ? <AiFillStar size="30" fill="green" /> : <AiOutlineStar color="green" size="30" />}
					</span>
				</div>
				<input
					value={myReview}
					className="form-control"
					placeholder="Describe your experience (optional)"
					type="text"
					onChange={(e) => setMyReview(e.target.value)}
				/>
			</div>
			<div style={{ display: "flex", alignItems: "baseline" }}>
				<span style={{ marginRight: "auto" }}>{reviewCount} Reviews</span>
				<button
					hidden={reviewState != 1}
					onClick={writeReview}
					disabled={myReviewCount == 0 || dis}
					className="btn btn-primary"
				>
					Write a Review
				</button>
				<button hidden={reviewState != 2} onClick={writeReview} disabled={dis} className="btn btn-primary">
					Update Review
				</button>
			</div>
		</div>
	);
}

export default Reviews;
