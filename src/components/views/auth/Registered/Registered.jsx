import { useParams } from 'react-router-dom';

export default function Registered() {
    const { teamId } = useParams();

    return (
        <div className="containet">Your team's id is: {teamId}</div>    
        )
};
