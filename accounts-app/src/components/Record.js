import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';

export default function Record(props) {



    const [edit, setEdit] = useState(false);

    const rDate = useRef();
    const rTitle = useRef();
    const rAmount = useRef();


    function handleToggle() {
        setEdit(!edit);
    }
    function handleEdit(e) {
        e.preventDefault();
        const record = {
            date: rDate.current.value,
            title: rTitle.current.value,
            amount: Number.parseInt(rAmount.current.value, 0)
        }

        RecordsAPI.update(props.record.id, record).then(
            response => {
                props.handleEditRecord(props.record, response.data)
                setEdit(false);
            }
        ).catch(
            error => console.log(error.message)

        )


    }
    function handleDelete(e) {
        e.preventDefault();
        RecordsAPI.remove(props.record.id).then(
            response => props.handleDeleteRecord(props.record)
        ).catch(
            error => console.log(error.message)
        )
    }


    function recordRow() {
        return (
            <tr>
                <td>{props.record.date} </td>
                <td>{props.record.title} </td>
                <td>{props.record.amount} </td>
                <td> <button className="btn btn-info mr-1" onClick={handleToggle} >Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete} >Delete</button></td>
            </tr>);
    }
    function recordForm() {
        return (
            <tr>
                <td><input type="text" className="form-control" defaultValue={props.record.date} ref={rDate} /></td>
                <td><input type="text" className="form-control" defaultValue={props.record.title} ref={rTitle} /></td>
                <td><input type="text" className="form-control" defaultValue={props.record.amount} ref={rAmount} /></td>

                <td> <button className="btn btn-info mr-1" onClick={handleEdit}>Update</button>
                    <button className="btn btn-danger" onClick={handleToggle} >Cancel</button></td>
            </tr>);
    }
    if (edit) {
        return recordForm();
    } else {
        return recordRow();
    }


}



Record.propTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
}