import React from "react";
import PropTypes from 'prop-types';
import contructorStyle from './constructor.module.css';

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default class Constructor extends React.Component {
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
      <main className={`pb-10 ${contructorStyle.container}`}>
        { this.state.ingredients.length > 0 && <BurgerIngredients ingredients={this.state.ingredients} /> }
        { this.state.components.length > 0 && <BurgerConstructor components={this.state.components} /> } 
      </main>
    );
  }
};

const propsPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

Constructor.propTypes = {
  _id: propsPropTypes,
  name: propsPropTypes,
  type: propsPropTypes,
  proteins: propsPropTypes,
  fat: propsPropTypes,
  carbohydrates: propsPropTypes,
  calories: propsPropTypes,
  price: propsPropTypes,
  image: propsPropTypes,
  image_mobile: propsPropTypes,
  image_large: propsPropTypes,
  __v: propsPropTypes
};