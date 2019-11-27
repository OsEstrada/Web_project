import React from 'react';
import API from '../../utils/apiUrlBase';
import AddTransaction from './AddTransaction';
import TransactionRow from './TransactionRow';
import './bootstrap.min.css';

export default class Views extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transaction_list: [],
			account_list:[],
		};
	}

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		let options = {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${user.token}`
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

		fetch(`${API.baseURL}/accounts/user_id/${user._id}`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({account_list: this.state.account_list.concat(data)});
			})
			.catch((err) => console.log('Ocurrio un error en la conexion'));
	}

	//NOTA HE MODIFICADO ESTO
	handleSubmit(transaction) {
		let user = JSON.parse(localStorage.getItem('user'));
		let options = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${user.token}`
			},
			body: JSON.stringify(transaction)
		};

		fetch(`${API.baseURL}/transaction/create`, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				let list = this.state.transaction_list.slice();

				this.setState({
					transaction_list: list.concat([ data.transaction ])
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
		let rows = this.state.transaction_list.map((element,index)=>{
            return <TransactionRow key={index} 
			transaction={element}/>
        });
		return (
			<div>
				<AddTransaction
					onSubmit={(transaction) => {
						this.handleSubmit(transaction);
					}}
					account_list = {this.state.account_list}
				/>	
				<div style={{padding:'3%'}}>
                    <table className="table table-hover">
                        <thead>
                            <tr className='table-secondary'>
                                <th scope="col">Fecha</th>
                                <th scope="col">Cuenta</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
				</div>
			</div>
		);
	}
}
