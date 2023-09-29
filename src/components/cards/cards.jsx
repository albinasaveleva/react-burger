import React from "react";
import cardsStyle from './cards.module.css';

export default function Cards(props) {
  return (
    <div className={`pt-6 pb-10 pl-4 pr-4 ${cardsStyle.cards}`}>
      { props.children }
    </div>
  );
}