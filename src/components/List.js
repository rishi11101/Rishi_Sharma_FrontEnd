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