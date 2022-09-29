import React, { Component } from 'react';

class ClassForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            description: "",
            taskStatus: "",
            storeData: [],
            clientData: [],
        };
    }

    inputChangeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    getDataLocalStorage = () => {
        const getData = localStorage.getItem("client");
        const GetInfo = JSON.parse(getData);
        console.log("GetInfo....", GetInfo);
        this.setState({ clientData: GetInfo });
    }

    submitHandler = (event) => {
        event.preventDefault();

        let newStoreData = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            taskStatus: this.state.taskStatus,
        }

        // console.log("newStoreData", newStoreData)

        let newStoreDataList = this.state.storeData;
        newStoreDataList.push(newStoreData);
        this.setState({ storeData: newStoreDataList });
        localStorage.setItem('client', JSON.stringify(newStoreDataList));

        const getData = localStorage.getItem("client");
        this.getDataLocalStorage();
    }

    componentDidMount() {
        this.getDataLocalStorage();
    }

    deleteHandler = (id) => {
        // console.log("id...", id);
        const updated = this.state.clientData.filter((element, index) => {
            return element.id != id;
        });
        this.setState({ clientData: updated });

        const items = JSON.parse(localStorage.getItem("client"));
        items.forEach((i, ind) => {
            if (i.id == id) {
                items.splice(ind, 1);
            }
        })

        localStorage.setItem("client", JSON.stringify(items));

    }

    render() {
        // console.log("storeData", this.state.storeData)
        // console.log("clientData", this.state.clientData)
        return (
            <>
                <form  >
                    <div>
                        Task id :
                        <input type="text" name='id' onChange={this.inputChangeHandler} placeholder='Enter id' value={this.state.id} />
                    </div><br />
                    <div>
                        Task Title :
                        <input type="text" name='title' onChange={this.inputChangeHandler} placeholder='Enter Title' value={this.state.title} />
                    </div><br />
                    <div>
                        Task Description :
                        <input type="text" name='description' onChange={this.inputChangeHandler} placeholder='Enter Description' value={this.state.description} />
                    </div><br />
                    <div>
                        Status :
                        <input type="text" name='taskStatus' onChange={this.inputChangeHandler} placeholder='Enter Status' value={this.state.taskStatus} />
                    </div><br />
                    <div>
                        <button type='button' className='btn btn-primary btn-sm' onClick={this.submitHandler} >Submit</button>
                    </div>
                </form>
                <br />
                <hr />

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
                            this.state.clientData?.map((i, index) => {
                                return <tr key={index}>
                                    <th scope="row">{i.id}</th>
                                    <th >{i.title}</th>
                                    <td>{i.description}</td>
                                    <td>{i.taskStatus}</td>
                                    <td>
                                        <button type='button' className='btn btn-danger btn-sm' onClick={() => this.deleteHandler(i.id)}>
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
}

export default ClassForm;