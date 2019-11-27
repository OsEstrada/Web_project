import React from 'react';

export default class TransactionRow extends React.Component{

    render(){
        let element = this.props.transaction;
        return <tr className="table-light">
        <td>{element.date}</td>
        <td>{element.account}</td>
        <td>{element.type}</td>
        <td>{element.amount}</td>
    </tr>
    }
}