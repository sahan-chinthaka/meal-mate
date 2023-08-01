import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./review.scss";
import {
	collection,
	doc,
	getCountFromServer,
	getDoc,
	setDoc,
	serverTimestamp,
	getDocs,
	query,
	limit,
	orderBy,
} from "firebase/firestore";
import { FS } from "../../../firebase";
import { useAuth } from "../../../Context/AuthContext";

function Reviews({ shopID }) {
	const [myReviewCount, setMyReviewCount] = useState(0);
	const [myReview, setMyReview] = useState("");
	const [reviewState, setReviewState] = useState(0); // 0: Loading, 1: No review, 2: Has review
	const [dis, setDis] = useState(false);
	const [reviewCount, setReviewCount] = useState(0);
	const [reviews, setReviews] = useState([]);
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

		const q = query(c, orderBy("time", "desc"), limit(10));
		getDocs(c).then((snap) => {
			setReviews(snap.docs.map((i) => ({ ...i.data(), id: i.id })));
		});
	}, []);

	function writeReview() {
		const c = doc(FS, "shops", shopID, "reviews", auth.user.uid);
		setDis(true);

		setDoc(c, {
			review: myReview,
			rate: myReviewCount,
			time: serverTimestamp(),
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
			<div className="reviews">
				{reviews.map((i) => (
					<Review key={i.id} data={i} />
				))}
			</div>
		</div>
	);
}

function Review({ data }) {
	const date = new Date(data.time.seconds * 1000);

	return (
		<div>
			<div>
				<span>
					{data.rate >= 1 ? <AiFillStar size="15" fill="green" /> : <AiOutlineStar color="green" size="15" />}
					{data.rate >= 2 ? <AiFillStar size="15" fill="green" /> : <AiOutlineStar color="green" size="15" />}
					{data.rate >= 3 ? <AiFillStar size="15" fill="green" /> : <AiOutlineStar color="green" size="15" />}
					{data.rate >= 4 ? <AiFillStar size="15" fill="green" /> : <AiOutlineStar color="green" size="15" />}
					{data.rate >= 5 ? <AiFillStar size="15" fill="green" /> : <AiOutlineStar color="green" size="15" />}
				</span>
				<span style={{ fontSize: "13px", marginLeft: "5px" }}>{date.toDateString()}</span>
			</div>
			<p>{data.review}</p>
		</div>
	);
}

export default Reviews;
