import React, { useState, useEffect } from 'react';
import Record from './Record';

import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './recordForm'
import AmountBox from './AmountBox'
function Records() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    RecordsAPI.getAll().then(
      response => {
        setRecords(response.data);
        setIsLoaded(true);

      }
    ).catch(
      error => {
        setIsLoaded(true);
        setError(error.message);
      }
    )
  }, []);
  let recordComponent = null;
  if (error) {
    recordComponent = (<div>{error}</div>)
  } else if (!isLoaded) {
    recordComponent = (<div>Loading</div>)
  } else if (isLoaded) {

    function updateRecord(record, data) {
      const recordIndex = records.indexOf(record);
      const newRecords = records.map((item, index) => {
        if (index !== recordIndex) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          ...data
        };
      });
      setRecords(newRecords)

    }
    function deleteRecord(record) {
      const recordIndex = records.indexOf(record);
      const newRecords = records.filter((item, index) => index !== recordIndex);
      setRecords(newRecords);
    }
    recordComponent = (

      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, i) => <Record key={record.id} record={record}
              handleEditRecord={updateRecord}
              handleDeleteRecord={deleteRecord}
            />)}

          </tbody>
        </table>

      </div>


    );
  }

  function addRecord(record) {
    setRecords([...records, record]);
    setError(null);
    setIsLoaded(true);
  }

  function credits() {
    let credits = records.filter(record => {
      return record.amount >= 0;
    })
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0)
  }

  function debits() {
    let credits = records.filter(record => {
      return record.amount < 0;
    })
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0)
  }
  function balance() {
    return credits() + debits();
  }
  return (
    <React.Fragment>
      <h2>小型财务系统</h2>
      <div className='row mb-3'>
        <AmountBox text='Credits' type='success' amount={credits()}></AmountBox>
        <AmountBox text='Debits' type='danger' amount={debits()}></AmountBox>
        <AmountBox text='Balance' type='info' amount={balance()}></AmountBox>
      </div>
      <RecordForm handleNewRecord={addRecord} />
      {recordComponent}
    </React.Fragment>

  )
}

export default Records;