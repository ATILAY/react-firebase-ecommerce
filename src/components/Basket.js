import React from "react"
import formatCurrency from '../util';

export default class Basket extends React.Component {

    render(){

        return (
            <div className="alert  basket">
             {this.props.cartItems.length === 0 ? "Basket is empty": <div> You have {this.props.cartItems.length} products in the basket</div>}
                {this.props.cartItems.length >= 0 && 
                    <div className="div5">
                        <ul className="ul5">
                            {this.props.cartItems.map(
                                item=>
                              (  <li key={item.title} className="li5">
                                    <b className="b5">
                                        {item.title}
                                    </b>
                                    X {item.count} = {item.price * item.count}
                                    <button className="btn btn-danger button5" onClick={e => this.props.handleRemoveFromCart(e, item)}>
                                        X
                                    </button>
                                </li>)
                            )}
                        </ul>
                        Total : {formatCurrency(this.props.cartItems.reduce((a, c)=> a + c.price * c.count, 0 ))}
                        <button className="btn btn-primary" onClick={ ()=> alert("Checkout  needs to implement...")}>Checkout</button>
                    <br/>
                    </div>
                }
            </div>
        )
    }
}