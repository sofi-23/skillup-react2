import Header from "../../Header/Header.jsx";
import { useResize } from "../../../hooks/useResize.js";
import  Card  from "../../Card/Card.jsx";
import { cardsData } from "./cardsData.js";
import TaskForm from "../../TaskForm/TaskForm.jsx";

export default function Tasks() {

   const { isPhone } = useResize();

    const limitString = (str) => {
        if (str.length > 150) {
            return {string: str.slice(0, 150) + "...", addButton: true};
        }
        return {string: str, addButton: false};
    }

    return(
        <>
            <Header />
            <main className="container containerTasks">
                <TaskForm />
                <div>
                    <h2>My tasks</h2>
                </div>
                <div className="list">
                    {cardsData.map(card => (
                        <Card 
                            key={card.id}
                            isPhone={isPhone} 
                            limitString={limitString} 
                            data={card}
                        />
                    ))}
                </div>
                
            </main>
        </>
    )
};
