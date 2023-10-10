import React from "react";
import ingredientsCategoryStyle from './ingredients-category.module.css';

// function IngredientsCategory({title, value, children}) {
//   return (
//     <div ref={ref} className={ingredientsCategoryStyle.container} id={value}>
//       <h3 className="text text_type_main-medium">
//         { title }
//       </h3>
//       <div className={`pt-6 pb-10 pl-4 pr-4 ${ingredientsCategoryStyle.content}`}>
//         { children }
//       </div>
//     </div> 
//   );
// }
const IngredientsCategory = React.forwardRef(({title, value, children}, ref) => {
  return (
    <div ref={ref} className={ingredientsCategoryStyle.container} id={value}>
      <h3 className="text text_type_main-medium">
        { title }
      </h3>
      <div className={`pt-6 pb-10 pl-4 pr-4 ${ingredientsCategoryStyle.content}`}>
        { children }
      </div>
    </div> 
  );
});

// export default IngredientsCategory;
export default React.memo(IngredientsCategory);