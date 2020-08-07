import React, { Component } from 'react';
//import { render } from 'react-dom';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components//Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
const INGREDIENT_PRICES={
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}


class  BurgerBuilder extends Component {
  //constructor(props){
    //super(props);
    //this.state={...}
  //}
  state={
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalprice: 0,
    purchasable:false,
    purchasing:false
    
  }
  updatePurchaseState(ingredients){
    
    const sum=Object.keys(ingredients)
    .map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,el)=>{
         return sum+el;
    },0);
    this.setState({purchasable:sum > 0})
  }
addIngredienthandler=(type)=>{
const oldCount=this.state.ingredients[type];
const updatedCount=oldCount+1;

const updatedIngredients={
  ...this.state.ingredients
};
updatedIngredients[type]=updatedCount;
const priceAddition=INGREDIENT_PRICES[type];
const oldPrice=this.state.totalprice;
const newPrice=oldPrice+priceAddition;
this.setState({totalprice:newPrice,ingredients:updatedIngredients});
this.updatePurchaseState(updatedIngredients);
}
removeIngredientHandler=(type)=>{
  const oldCount=this.state.ingredients[type];
  if(oldCount<=0){
    return;
  }
  const updatedCount=oldCount-1;
  
  const updatedIngredients={
    ...this.state.ingredients
  };
  updatedIngredients[type]=updatedCount; 
  const priceDeduction=INGREDIENT_PRICES[type];
  const oldPrice=this.state.totalprice;
  const newPrice=oldPrice-priceDeduction;
  this.setState({totalprice:newPrice,ingredients:updatedIngredients});
  this.updatePurchaseState(updatedIngredients);
}
purchaseHandler=()=>{
  this.setState({purchasing:true});
};

purchaseCancelHandler=()=>{
  this.setState({purchasing:false})
}
purchaseContinueHandler=()=>{
  const order={
    ingredients:this.state.ingredients,
    price:this.state.totalprice,
    customer:{
      name:'kaviya',
      address:{
        street:'pillaiyarkoil street',
        Zipcode:'44455',
        country:'India'
      },
      email:'test@test.com'
    },
    deliverymethod:'fastest'
  }
  //alert('You continue');
     axios.post('/orders/json',order)
     .then(response=>console.log(response))
     .catch(error=>console.log(error));
}

  render() {
    const disabledInfo={
      ...this.state.ingredients
    };
    for(let Key in disabledInfo){
      disabledInfo[Key]=disabledInfo[Key]<=0
    }
      return (
          <Auxilary>
            <Modal show={this.state.purchasing} modalclosed={this.purchaseCancelHandler}>
              <OrderSummary ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalprice}
              />
            </Modal>
              <Burger ingredients={this.state.ingredients} />
              <BuildControls 
              ingredientAdded={this.addIngredienthandler}
              ingredientRemoved={this.removeIngredientHandler}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
              disabled={disabledInfo}
              price={this.state.totalprice}
          />
          </Auxilary>
      );
  };
};
export default BurgerBuilder