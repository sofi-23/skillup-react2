export default function Card({isPhone, limitString, data: {title, description, date, priority, status, name}}) {

    return (
        <div className="card">
            <div className="card-header"> 
                <h3>{title}</h3>
                <div className="close">X</div>
            </div>
            <h6>{date}</h6>
            <h5>{name}</h5>
            <button className="button">{status}</button>
            <button className="button">{priority}</button>
            <p>{isPhone ? 
                limitString(description).string  :
                description}
            </p>
        </div>
    )
};


