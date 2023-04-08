import "./Card.css";

const Card = (props) => {
	return <div className="card">
		<div className="card_title">
			<p>{props.title.trim() !== "" ? props.title : "(None)"}</p>
		</div>
		<div className="card_content">
			<p>{props.content}</p>
		</div>
		<div className="card_delete">
			<img src="https://cdn-icons-png.flaticon.com/32/6861/6861362.png" alt="delete" onClick={()=>{
				props.delete(props.id);
			}}/>
		</div>
	</div>
}

export default Card;