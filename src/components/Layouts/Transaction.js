import React from 'react';
import API from '../../utils/apiUrlBase';
import AddTransaction from './AddTransaction';
import TransactionTable from './TransactionTable';

export default class Views extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transaction_list: []
		};
	}

	componentDidMount() {
		let options = {
			headers: {
				Accept: 'application/json'
			}
		};
		fetch(`${API.baseURL}/transaction`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({transaction_list: this.state.transaction_list.concat(data)});
			})
			.catch((err) => console.log('Ocurrio un error en la conexion'));
	}

	handleSubmit(transaction) {
		let options = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json'
			},

			body: JSON.stringify(transaction)
		};

		fetch(`${API.baseURL}/transactions/create`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				let list = this.state.transaction_list.slice();

				this.setState({
					transaction_list: list.concat([ data.account ])
				});
			})
			.catch((err) => console.log('Ocurrio un error en la conexion'));
  }
  
  handleDelete(transaction){

    let options ={
        method : "DELETE",
        headers : {
            "Content-type" : "application/json",
            Accept: "application/json"
        },

        body :  JSON.stringify({id:transaction._id})
    }

    fetch(`${API.baseURL}/transactions/delete`,options)
    .then(res =>{return res.json()})
    .then(data=>{
        console.log(data);

        let index = this.state.transaction_list.find(value=>{
            return value._id === transaction._id;
        })

        let buffer_list = this.state.transaction_list.slice();
        buffer_list.splice(index, 1);

        this.setState({
            transaction_list: buffer_list
        });
    })
    .catch(err => console.log("Ocurrio un error en la conexion"))
}

	render() {
		return (
			<div>
				<AddTransaction
					onSubmit={(transaction) => {
						this.handleSubmit(transaction);
					}}
				/>

        <div style={{display:'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
          {this.state.transaction_list.map((element) => {
            return <TransactionTable key={element._id} transaction={element} onDelete= {()=>{
                    this.handleDelete(element);
                }} />;
          })}
        </div>
			</div>
		);
	}
}