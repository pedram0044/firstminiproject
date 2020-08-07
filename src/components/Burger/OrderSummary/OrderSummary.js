import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from  '../../UI/Button/Button';
  class OrderSummary extends Component {
      //this could be a functional component ..doesn't have to be a class coponent.
      componentWillUpdate(){
          console.log('[OrderSummary] Willupdate');
      }
      render(){
        const ingredientSummary= Object.keys(this.props.ingredients)
        .map(igKey=>{
            return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]};
            </li>);
        })
          return(
            <Auxilary>
            <h3>your order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>TOTAL PRICE:{this.props.price.toFixed(2)}</strong></p>
            <p>continue to checkout?</p>
            <Button btntype="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
            <Button btntype="Success" clicked={this.props.purchaseContinued}>Continue</Button>
             </Auxilary>
          )
      }
    };
  export default OrderSummary;