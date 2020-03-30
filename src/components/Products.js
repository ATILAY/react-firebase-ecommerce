import React  from 'react';
import formatCurrency from '../util';
//import * as firebase from "firebase"


export default  function Products(props){
    //let {photoArray } = this.props;
    console.log(props.products)
    const productItems = props.products.map( product =>(
       //{ console.log(props.photoArray[product.id]) }
    

        <div key={product.id} className="col-md-6">
        <div className="thumbnail  text-center product">
        <a href={`#${product.id}`} onClick={ (e) => {props.handleAddToCart(e, product)} }>
            <img className="img" key={product.id} src={props.photoArray[(product.id-1)]} alt={product.title}/>
            <p className="product-title">
                {//console.log(props.photoArray[product.id])
                }
                {product.title}
            </p>
        </a>
        <div>
            <b className="price">
                {formatCurrency(product.price)}
            </b>
            <button className="btn btn-primary"
             onClick = { (e) => {props.handleAddToCart(e, product)}}
            >
                Add To Cart
            </button>
        </div>
        </div>
        </div>
        )
    );
    //console.log(props.products) 
        return (
            <div className="row d-flex justify-content-center">{productItems}   </div>
             
        );

}

