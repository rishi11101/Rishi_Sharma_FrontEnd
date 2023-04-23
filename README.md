# Frontend Engineer Assignment - SteelEye Limited

Assignment submitted by - Rishi Sharma <br/> Reg no - 12003011 <br/> Email - rishisharma11101@gmail.com

### Question 1 : Explain what the simple List component does.

Answer : The List component renders a list of items and allows selecting a single item at a time.
It takes an array of items through props and each item has a text property that represents the text to display in the list. <br/>
And the component maps over the items array and renders a SingleListItem component for each item. 
The SingleListItem component displays the text and applies a green background color to selected item or red if not selected. <br/>
The component tracks the selected index using the useState hook and clears the selected index whenever the items prop changes using the useEffect hook. <br/>
Finally, React memo function is used to optimize the rendering of the component by avoiding unecessary re renders.

### Question 2 : What problems / warnings are there with code?

Answer :

1. shapeOf not a valid PropType method in the code <br/>
```
WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shapeOf({
    text: PropTypes.string.isRequired,
  })),
}; 
```
2. Error in declaration of selectedIndex and useState hook syntax, its good practice to to write the variable first followed by a function to update the value <br/>
`const [setSelectedIndex, selectedIndex] = useState();` <br/>
Also initial state variable value is missing, Can be assigned null. <br/>

3. In SingleListItem, the onClickHandler function is being called immediately as a regular function instead of being passed as a callback function. This will cause onClickHandler to get called as soon as the component is rendered, rather than when the a list item is clicked. <br/>

4. The 'index' and 'isSelected' props should also be required in WrappedSingleListItem <br/>

5. isSelected prop should be passed a boolean value to fix type mismatch
`isSelected={selectedIndex === index}`

6. The items prop is not set to be required, and if it's null, it will cause error. So set some default list items in items array. <br/>

7. Whenever using map functions in React, its important to assign a unique key to each item.
```
{items.map((item, index) => (
        <SingleListItem
          key={index}  //passed key to track items that have changed in list (improves performance)
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index} 
        />
      ))} 
```

### Question 3 : Please fix, optimize, and/or modify the component as much as you think is necessary. <br/>
Answer : The modified code is given below : <br/>
```
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({index, isSelected, onClickHandler, text}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={() => onClickHandler(index)}>
      {text}

    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({items}) => {

  const [selectedIndex, setSelectedIndex] = useState(null); //Initialized with 'null' value

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    selectedIndex === index ? setSelectedIndex(null) : setSelectedIndex(index);
    //toggles the selection of items in list
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}  //passed key to track items that have changed in list (improves performance)
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index} 
          //added condition to check if index of the current item is equal to selected item's index
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
  //Here, shapeOf not a valid PropType method
};

WrappedListComponent.defaultProps = {
  items: [
    {text : "List Item 1"},
    {text : "List Item 2"},
    {text : "List Item 3"},
    {text : "List Item 4"}
  ]
};

const List = memo(WrappedListComponent);

export default List;

//Define and Export a memoized version of List using React memo function 
//This optimizes the performance by preventing unnecessary re-renders.
```
