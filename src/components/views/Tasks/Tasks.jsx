import Header from "../../Header/Header.jsx";
import { useResize } from "../../../hooks/useResize.js";
import  Card  from "../../Card/Card.jsx";
import TaskForm from "../../TaskForm/TaskForm.jsx";
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FormControl, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import debounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, deleteTask, editTaskStatus } from '../../../store/actions/tasksActions';

export default function Tasks() {
    const dispatch = useDispatch();

    const [list, setList] = useState(null)
    const [renderList, setRenderList] = useState(null)
    const [tasksFromWhom, setTasksFromWhom] = useState("everyone")
    const [search, setSearch] = useState("")
    
    const { loading, error, tasks } = useSelector(state => state.tasksReducer);
    
    useEffect(() => {
        dispatch(getTasks(tasksFromWhom === "me" ? "/me" : ""))
    }, [tasksFromWhom, dispatch]);

    useEffect(() => {
        if (tasks?.length) {
            setList(tasks)
            setRenderList(tasks)
        }
    }, [tasks]);
    useEffect(() => {
        if (search) {
            setRenderList(list.filter(task => task.title.toLowerCase().includes(search.toLowerCase())))
        }else {
            setRenderList(list)
        }
    }, [search]);

    const handleEditCardStatus = (data) => {
        dispatch(editTaskStatus(data))
    }
   const { isPhone } = useResize();
    if (error) return <div>There's been an error</div>

   const deleteCard = (id) => {
        dispatch(deleteTask(id))
   }
    const renderColumnCards = (text) => {
        return ( 
            renderList?.filter(item => item.status === text)
            .map((item) => { 
            return (
                <Card
                key={item._id}
                isPhone={isPhone}
                data={item}
                editCardStatus={handleEditCardStatus}
                deleteCard={deleteCard}
                />  
            )
        }))
    }

    const handleChangeImportance = (e) => {
        if (e.target.value === "ALL") {
            setRenderList(list)
        } else {
            setRenderList(list?.filter(item => item.importance === e.target.value))
        }
    }

    const handleSearch = debounce(e => {
        setSearch(e?.target?.value)
    }, 1000);

    return(
        <>
            <Header />
            <main className="container containerTasks">
                <TaskForm />
                <div>
                    <h2>My tasks</h2>
                </div>
                <div>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        defaultValue="everyone"
                        name="row-radio-buttons-group"
                        onChange={(e)=> 
                            setTasksFromWhom(e.currentTarget.value)
                        }
                    >
                        <FormControlLabel value="me" control={<Radio />} label="Me" />
                        <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                    </RadioGroup>
                </FormControl>
                <div>
                    <input type="text" placeholder="Search by title..." onChange={handleSearch}></input>
                </div>
                    <select name="importance" onChange={handleChangeImportance}>
                        <option value="">Select a priority</option>
                        <option value="ALL">All</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                </div>
                {isPhone ? 
                ( !renderList?.length ?
                    <div className="phoneList">
                    <div>No tasks created yet...</div>
                    </div>
                    : loading? <Skeleton /> :
                    <div className="phoneList">
                    <h4>New</h4>
                    <div>{renderColumnCards("NEW")}</div>
                    <h4>In Progress</h4>
                    <div>{renderColumnCards("IN PROGRESS")}</div>
                    <h4>Finished</h4>
                    <div>{renderColumnCards("FINISHED")}</div>
                    </div> )
                    : (
                    !renderList?.length ? 
                    <div>No tasks created yet...</div>
                    : loading? <> 
                    <Skeleton height={90} />
                    <Skeleton height={90} />
                    <Skeleton height={90} />
                    </> :
                    <div className="list">
                        <div>
                            <h4>New</h4>
                            <div>{renderColumnCards("NEW")}</div>
                        </div>
                        <div>
                            <h4>In progress</h4>
                            <div>{renderColumnCards("IN PROGRESS")}</div>
                        </div>
                        <div>
                            <h4>Finished</h4>
                            <div>{renderColumnCards("FINISHED")}</div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
};
