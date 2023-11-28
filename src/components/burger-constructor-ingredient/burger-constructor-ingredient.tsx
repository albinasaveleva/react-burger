import React, {FC} from "react";
import { useDrop, useDrag } from "react-dnd";

import { 
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorIngredientStyle from './burger-constructor-ingredient.module.css';

import { TIngredient } from "../../types/data";

type TComponentProps = {
  item: TIngredient; 
  index: number; 
  moveIngredient: (dragIndex: number, hoverIndex: number) => void; 
  deleteIngredient: () => void;
};

const BurgerConstructorIngredient: FC<TComponentProps> = ({item, index, moveIngredient, deleteIngredient}) => {
  type TDropIngredient = {
    item: TIngredient,
    index: number,
  };

  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'burger-constructor-ingredient',
    hover(item: TDropIngredient, monitor: any) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
    collect: (monitor: any) => ({
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
        handleClose={deleteIngredient}
      />
    </div>
  );
};

export default BurgerConstructorIngredient;