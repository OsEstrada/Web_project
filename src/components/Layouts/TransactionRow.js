import React from 'react';

export default class TransactionRow extends React.Component{

    render(){
        let element = this.props.transaction;
        let date = String(element.date)
        let stringDate = date.split("T");
        return <tr className="table-light">
        <td>{stringDate[0]}</td>
        <td>{element.account.name}</td>
        <td>{element.type}</td>
        <td>{element.amount}</td>
    </tr>
    }
}