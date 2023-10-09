import React from "react";
import { useDrop, useDrag } from "react-dnd";

import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';

import { 
  Box,
  ConstructorElement,
  DragIcon,
  Typography 
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorIngredientStyle from './burger-constructor-ingredient.module.css';

function BurgerConstructorIngredient({item, index, moveIngredient}) {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: 'burger-constructor-ingredient',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveIngredient(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'burger-constructor-ingredient',
    item: {item, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={ref} style={{ opacity }} className={burgerConstructorIngredientStyle.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        type={undefined}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        extraClass="ml-2"
      />
    </div>
  );
};

BurgerConstructorIngredient.propTypes = {
  item: ingredientType,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired
};

// export default BurgerConstructorIngredient;
export default React.memo(BurgerConstructorIngredient);