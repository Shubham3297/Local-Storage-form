import React, { useState, useEffect } from 'react'

function Form() {
    const [state, setState] = useState({
        id: "",
        title: "",
        description: "",
        taskStatus: ""
    })

    const [storeData, setStoreData] = useState([]);
    const [clientData, setClientData] = useState();

    const { id, title, description, taskStatus } = state;

    const inputChangeHandler = (event) => {

        setState({ ...state, [event.target.name]: event.target.value })
    }

    // const submitHandler = () => {
    //     localStorage.setItem("client", JSON.stringify(state));
    // }

    // const submitHandler = () => {
    //     setStoreData(localStorage.setItem("client", JSON.stringify([state])))
    //     //     setStoreData(() => ({ 
    //     //     localStorage.setItem("client", JSON.stringify(state))

    //     //      }))
    // }

    const submitHandler = (event) => {
        event.preventDefault();
        setStoreData(state);
        const getData = localStorage.getItem("client");
        const GetInfo = JSON.parse(getData);
        GetInfo.push(state);
        localStorage.setItem("client", JSON.stringify(GetInfo));
        // localStorage.setItem("client", JSON.stringify([storeData]));

        getDataLocalStorage();
    }

    // console.log("storeData.....", storeData)

    const getDataLocalStorage = () => {
        const getData = localStorage.getItem("client");
        const GetInfo = JSON.parse(getData);
        // console.log("GetInfo....", GetInfo);
        setClientData(GetInfo);
    }

    useEffect(() => {
        getDataLocalStorage();
    }, []);


    console.log("ClientData,....", clientData);

    const deleteHandler = (id) => {
        console.log("id...", id);

        const updated = clientData.filter((element, index) => {
            return element.id != id;
        });
        setClientData(updated);

        const items = JSON.parse(localStorage.getItem("client"));
        items.forEach((i, ind) => {
            if (i.id == id) {
                items.splice(ind, 1);
            }
        })

        localStorage.setItem("client", JSON.stringify(items));

        // const items = JSON.parse(localStorage.getItem("client"));
        // items.forEach((i, ind) => {
        //     if (i.id == id) {
        //         items.splice(ind, 1, i);
        //     }
        // })

        // localStorage.setItem("client", JSON.stringify(items));

        // localStorage.removeItem(id);

        // localStorage.removeItem(JSON.stringify(clientData[i]));

        // storeData.splice(i, 1);
        // localStorage.setItem("client", JSON.stringify([storeData]));

        // const GetInfo = JSON.parse(localStorage.getItem("client"));
        // delete GetInfo.i;



    }

    return (
        <>
            <form  >
                <div>
                    Task id :
                    <input type="text" name='id' onChange={inputChangeHandler} placeholder='Enter id' value={id} />
                </div><br />
                <div>
                    Task Title :
                    <input type="text" name='title' onChange={inputChangeHandler} placeholder='Enter Title' value={title} />
                </div><br />
                <div>
                    Task Description :
                    <input type="text" name='description' onChange={inputChangeHandler} placeholder='Enter Description' value={description} />
                </div><br />
                <div>
                    Status :
                    <input type="text" name='taskStatus' onChange={inputChangeHandler} placeholder='Enter Status' value={taskStatus} />
                </div><br />

                <div>
                    <button type='button' className='btn btn-primary btn-sm' onClick={submitHandler} >Submit</button>
                </div>
            </form>
            <br />
            <br />
            <hr />
            <br />

            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientData?.map((i, index) => {
                            return <tr key={index}>
                                <th scope="row">{i.id}</th>
                                <th >{i.title}</th>
                                <td>{i.description}</td>
                                <td>{i.taskStatus}</td>
                                <td>
                                    <button type='button' className='btn btn-danger btn-sm' onClick={() => deleteHandler(i.id)}>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export default Form