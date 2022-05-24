import { useState } from 'react';


export default function Card({
    isPhone,
    editCardStatus,
    deleteCard, 
    data: {_id, title, description, createdAt, importance, status, user},
    data
}) {

    const datetime = new Date(createdAt).toLocaleString() + " hs.";
    const [showMore, setShowMore] = useState(false)
    const limitString = (str) => {
        if (str.length > 150) {
            return {string: str.slice(0, 150) + "...", addButton: true};
        }
        return {string: str, addButton: false};
    }



    return (
        <div className="card">
            <div className="card-header"> 
                <h3>{title}</h3>
                <div className="close" onClick={()=>deleteCard(_id)}>X</div>
            </div>
            <h6>{datetime}</h6>
            <h5>{user.userName}</h5>
            <div className="card_buttons_container">
                <button onClick={ () =>{editCardStatus(data)}} className={`button ${status.toLowerCase()}`} type="button" >{status.toLowerCase()}</button>
                <button className={`button ${importance.toLowerCase()}`}>{importance.toLowerCase()}</button>
            </div>
            <p> 
                {!showMore && limitString(description).string}
            </p>
            {showMore && <><p>{description}</p> <button type="button" className="moreButton" onClick={()=> setShowMore(false)}>Less</button></>}
            {!showMore && limitString(description).addButton && <button type="button" className="moreButton" onClick={()=> {setShowMore(true)}}>More</button>}
        </div>
    )
};


