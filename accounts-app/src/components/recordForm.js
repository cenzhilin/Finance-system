import React, { useState } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export default function RecordForm(props) {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    function valid() {
        return date && title && amount;
    }
    function handleSubmit(e) {

        const data = { date: date, title: title, amount: Number.parseInt(amount, 0) };

        e.preventDefault();
        RecordsAPI.create(data).then(
            response => {
                props.handleNewRecord(response.data);
                setDate("");
                setTitle("");
                setAmount("");
            }

        ).catch(
            error =>
                console.log(error.message)

        )
    }
    return (
        <form className='form-inline mb-3' onSubmit={handleSubmit}>
            <div className="form-group mr-1">
                <input type="text" className='form-control' onChange={(e) => setDate(e.target.value)} placeholder="Date" name="date" value={date}></input>
            </div>
            <div className="form-group mr-1">
                <input type="text" className='form-control' onChange={(e) => setTitle(e.target.value)} placeholder="Title" name="title" value={title}></input>
            </div>
            <div className="form-group mr-1">
                <input type="text" className='form-control' onChange={(e) => setAmount(e.target.value)} placeholder="Amount" name="amount" value={amount}></input>
            </div>
            <button type='submit' className='btn btn-primary' disabled={!valid()}>Creat Record</button>

        </form>)
}