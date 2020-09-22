import React, { useState, useEffect, useRef } from 'react';
import QueryItem from './QueryItem.jsx';
import DropdownItem from './DropdownItem.jsx';
import RecursiveCall from './RecursiveCall.jsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Minus from '../images/buttons/minus-button.svg';
import MinusHover from '../images/buttons/minus-button-hover.svg';
import Plus from '../images/buttons/plus-button.svg';
import PlusHover from '../images/buttons/plus-button-hover.svg';

// component to get ALL data from our created DB
const QueryDisplay = (props) => {
  const { initialQuery: initialField, type, sub, outputFunction } = props; // passed in from QueryContainer

  const [queryList, setQueryList] = useState(initialField);
  const [availableList, setAvailableList] = useState([]);
  const [plusDropdown, togglePlusDropdown] = useState(false);
  const [subQuery, setSubQuery] = useState(sub); // if this is true, indicates we're in a sub query

  // Below makes the PLUS dropdown go away when you cick it:
    const ref = useRef(null);
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        togglePlusDropdown(false);
      }
    };
    useEffect(() => {
      // triggers listener for clicks outside
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [])
  //

  // initializes the available fields list
  useEffect(() => {
    setAvailableList(initialAvailableList());
  }, []);

  const cityItems = [
    { country_id: "string" },
    // { id: "string" }, // commenting out because we're making it the default
    { name: "string" },
    { population: "string" },
  ];

  const countryItems = [
    // { id: "string" },
    { name: "string" },
    { capital: "string" },
    { cities: cityItems }, // the name of the City type
  ];

  // returns an array equal to whichever item list corresponds with the query type
  const initialAvailableList = () => {
    if (type === 'Country') return convertIntoList(countryItems);
    if (type === 'City') return convertIntoList(cityItems);
  };

  const convertIntoList = (itemList) => {
    // Takes the items list and returns something like: [ id, name, capital, cities ]
    const output = itemList.map((obj) => {
      let key = Object.keys(obj)[0];
      return key;
    });

    const noDuplicates = []; // get rid of potential duplicates
    output.forEach((el) => {
      queryList.forEach((qEl) => {
        if (el !== qEl) noDuplicates.push(el);
      });
    });

    return noDuplicates;
  };

  //======= DELETE BUTTON ========//
  function deleteItem(item) {

    // removes item from queryList
    const newList = [...queryList];
    const index = newList.indexOf(item);
    newList.splice(index, 1);
    setQueryList(newList); // change query list

    // modify output
    if (sub) {
      outputFunction(0, newList, 0);
    } else {
      outputFunction(newList, 0, 0);
    }

    // // adds item to availableList
    const newAvailableList = [...availableList];
    newAvailableList.push(item);
    setAvailableList(newAvailableList); // change available list
  }

  //======= ADD BUTTON ========//
  function addItem(item) {

    // adds item to queryList
    const newList = [...queryList];
    newList.push(item);
    setQueryList(newList);

    // modify output
    if (sub) {
      outputFunction(0, newList, 0);
    } else {
      outputFunction(newList, 0, 0);
    }

    // removes item from availableList
    const newAvailablelist = [...availableList];
    const index = newAvailablelist.indexOf(item);
    newAvailablelist.splice(index, 1);
    setAvailableList(newAvailablelist);

    // un-toggles the plus dropdown
    togglePlusDropdown(false);
  }

  const ob = '{',
    cb = '}',
    tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>,
    space = <span>&nbsp;</span>;
  // Create the query list that gets rendered
  const queriedItems = queryList.map((item, i) => {
    // if querying "cities"
    if (item === 'cities') {
      return (
        <>
          <div className='queryLine'>
            {tab}
            {tab}
            <button className='minus-button' onClick={() => deleteItem(item)}>
              <div className='plus-minus-icons'>
                <img src={Minus} />
                <img src={MinusHover} className='hover-button' />
              </div>
            </button>
            {space}cities{space}{ob} 
          </div>
          <div className='queryLine'>
            <RecursiveCall
              initialQuery={['id']}
              type={'City'}
              outputFunction={outputFunction}
              sub={true}
            />
          </div>
          <div className='queryLine'>
            {tab}
            {tab}
            {cb}
          </div>
        </>
      );
    }
    // else
    return (
      <QueryItem
        item={item}
        key={`${type}Field${i}`}
        deleteItem={deleteItem}
        sub={sub}
      />
    );
  });

  // Creates dropdown menu from the available list
  const dropdown = availableList.map((item, i) => {
    return (
      <DropdownItem func={addItem} item={item} key={`Available${type}${i}`} />
    );
  });

  return (
    <>
      {/* List all the items we've already added */}
      <div className='queryLinesContainer'>{queriedItems}</div>

      {/* Plus sign, which opens a dropdown */}
      {tab}
      {tab}
      {sub && <>{tab}</>}
      <button
        className='plus-button'
        onClick={() => togglePlusDropdown(!plusDropdown)}
      >
        <div className='plus-minus-icons'>
          <img src={Plus} />
          <img src={PlusHover} className='hover-button' />
        </div>
        {/* Where the plus dropdown appears on click */}
        {plusDropdown && <div className='dropdown-menu' ref={ref}>{dropdown}</div>}
      </button>
    </>
  );
};

export default QueryDisplay;
