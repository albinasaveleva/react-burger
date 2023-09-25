import React from "react";
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';

import mainStyle from './main.module.css';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      components: [],
    };
  }

  componentDidMount() {
    const data = this.getIngredientsData();

    this.setState({
      ingredients: data,
    });

    this.addComponents(data);
  }

  addComponents = (data) => {
    this.setState({
      components: data,
    });
  }

  getIngredientsData  = () => {
    return this.props.data;
  }

  render() {
    return (
      <main className={`pb-10 ${mainStyle.container}`}>
        { this.state.ingredients.length > 0 && <BurgerIngredients ingredients={this.state.ingredients} /> }
        { this.state.components.length > 0 && <BurgerConstructor components={this.state.components} /> } 
      </main>
    );
  }
};

Main.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
};