//json-server  public/db.json  --port 8000

import React, { Component} from 'react'
import  './App.css'
import Products from "./components/Products"
import Filter from "./components/Filter"
import Basket from "./components/Basket"
import Loading from "./components/Loading"
import firebase from "./fbConfig"







export default class App extends Component {
    constructor(props){
        super(props);
        this.state = { products: [], filteredProducts: [], 
            cartItems:[], photoArray:[],
             loading: true, size:'',sort:''
            };
        this.handleChangeSort =  this.handleChangeSort.bind(this); 
        this.handleChangeSize = this.handleChangeSize.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
            //this.starCountRef = this.starCountRef.bind(this);
    }
    componentDidMount(){
            //var length;
          var starCountRef = firebase.database().ref('products/');
          starCountRef.on('value', snapshot  => {
           // console.log(snapshot.val().length);
           // length =snapshot.val().length;
           if(snapshot.val()){

            this.setState({
                products: snapshot.val(),
                filteredProducts: snapshot.val(),
                loading: false
                
            })
        }//if
 


            showPhoto();
          });    
           const showPhoto =()=>{
          var storage =  firebase.storage(); 
          
          //let tempArray = []; //temp
          this.state.products.forEach((product)=>{
              //let i = 0;
            let productIdString = (product.id).toString() +'.jpg';
            storage.ref().child(`${productIdString}`).getDownloadURL().then(url=>{
                //console.log(typeof url);
                this.setState({
                
                    photoArray:  [...this.state.photoArray, url]
                });
            });
            
            //i++;


          }
       
          );//foreach


 
           }//showPhoto
         // console.log('STORAGE', storage.ref().child('1.jpg').getDownloadURL());

        // fetch("https://github.com/dotnet-presentations/ContosoCrafts/blob/master/src/wwwroot/data/products.json")
        // .then(res=> res.json())
        // .then( data=> console.log(data))
        // .then(data=> this.setState({
        //     products: data.hits,
        //     filteredProducts: data.hits
        // }))
        
        if(localStorage.getItem('cartItems')){
          //  this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))});
        }//if
    }//com
    handleAddToCart(e, product){
        this.setState(state =>{
            const cartItems = state.cartItems;
            let productAlreadyInCart = false;
            cartItems.forEach(
                item => {
                    if(item.id === product.id){
                        productAlreadyInCart = true;
                        item.count++;
                    }//if
                }
            );
            if(!productAlreadyInCart ){
                cartItems.push({...product, count:1});
            }//if
            localStorage.setItem('cartItems',JSON.stringify(cartItems));
            return cartItems;

        });
    }
    handleRemoveFromCart(e, item){
        this.setState(state=>{
           const cartItems= state.cartItems.filter(el => el.id !== item.id);
           localStorage.setItem('cartItems', cartItems)
           return {cartItems}
        });
    }
    handleChangeSize(e){
        this.setState({size: e.target.value});
        this.listProducts();
        

    }
    handleChangeSort(e){
        this.setState({sort: e.target.value});
        this.listProducts();
        

    }
    listProducts(){
        this.setState(state=>{
            if(state.sort !== ''){
                state.products.sort( (a,b)=> (state.sort === 'lowest')?(a.price > b.price? 1 : -1): (a.price < b.price? 1 : -1) );
            }else{
                state.products.sort( (a,b)=> (a.id < b.id ? 1 : -1 ) );
            }//else
            if(state.size !== ''){
                return { filteredProducts: state.products.filter(
                    a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0 
                ) }
            }
            return {filteredProducts: state.products};
        });
    }
    //firebase storage
    
  


   
    
    

    render(){
        //console.log(this.state.products)
        return (
            
            <>
            {
                (this.state.products.length <= 0 )?
                    ( <Loading className="loading"/>) : (
                
                <div className="container">
                    <h1>
                    E-commerce
                    </h1>
                    <hr/>
                    <div className="row d-flex justify-center">
                    <div className="col-md-8">
                    <Filter size={this.state.size} sort={this.state.sort} handleChangeSize={this.handleChangeSize} 
                     handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length}/>
                     <hr/>
                    <Products  photoArray={this.state.photoArray} products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
                    </div>
                    <div className="col-md-4">
                        <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}  />
                    </div>
                    </div>
                    </div>)
                
            }

        </>
            );
    }
}
