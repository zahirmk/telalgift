
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OrderForm.css';
import logo from './Images/TelalImage.png';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';

import { useNavigate } from 'react-router-dom';

function OrderForm() {
  const location = useLocation();
  const userDetails = location.state?.userDetails;
  const navigate = useNavigate();
  

  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderItems, setOrderItems] = useState([{ product_name: '', gift_product: '', quantity: 1 }]);
  const [primaryItems, setPrimaryItems] = useState([]);
  const [giftItems, setGiftItems] = useState([]); 
  const [filteredPrimaryItems, setFilteredPrimaryItems] = useState([]);
  const [filteredGiftItems, setFilteredGiftItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //const [activeDropdown, setActiveDropdown] = useState(null);
  const [activePrimaryDropdown, setActivePrimaryDropdown] = useState(null);
  const [activeGiftDropdown, setActiveGiftDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const fetchPrimaryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/primaryitems');
        //const response = await axios.get('http://promotion.altelal.com/api/primaryitems');
        setPrimaryItems(response.data);
      } catch (error) {
        console.error('Error fetching primary items:', error);
      }
    };
    fetchPrimaryItems();
  }, []);

  useEffect(() => {
    const fetchGiftItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/giftitems');
        //const response = await axios.get('http://promotion.altelal.com/api/giftitems');
        setGiftItems(response.data);
      } catch (error) {
        console.error('Error fetching gift items:', error);
      }
    };
    fetchGiftItems();
  }, []);


  const handleItemChange = (index, event) => {
    const { name, value } = event.target;

    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [name]: value };

    if (name === 'quantity') {
      if (value < 1) {
        newItems[index].quantity = 1; // Reset to minimum
      } else if (value > 9) {
        newItems[index].quantity = 9; // Reset to maximum
      }
    }

    setOrderItems(newItems);
  };

  const handleFilterChange = (index, event) => {
    const inputValue = event.target.value;
    const filtered = primaryItems.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredPrimaryItems(filtered);
    setSelectedIndex(-1);
    setActivePrimaryDropdown (index);

    const newItems = [...orderItems];
    newItems[index].product_name = inputValue;
    setOrderItems(newItems);
  };

  const handleSelectPrimaryItem = (index, item) => {
    const newItems = [...orderItems];
    newItems[index].product_name = item;
    setOrderItems(newItems);
    setFilteredPrimaryItems([]);
    setActivePrimaryDropdown(null);
  };

  const handleGiftFilterChange = (index, event) => {
    const inputValue = event.target.value;
    const filtered = giftItems.filter(item=>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredGiftItems(filtered);
    setSelectedIndex(-1);
    setActiveGiftDropdown( index);

    const newItems = [...orderItems];
    newItems[index].gift_product = inputValue;
    setOrderItems(newItems);
  };

  const handleSelectGiftItem = (index, item) => {
    const newItems = [...orderItems];
    newItems[index].gift_product = item;
    setOrderItems(newItems);
    setFilteredGiftItems([]);
    setActiveGiftDropdown (null);
  };


  // const handleKeyDown = (index, event, type) => {
  //   const filteredList = type === 'primary' ? filteredItems : filteredGiftItems;
  //   if (activeDropdown === index) {
  //     switch (event.key) {
  //       case 'ArrowDown':
  //         event.preventDefault();
  //         setSelectedIndex((prevIndex) =>
  //           prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
  //         );
  //         // setSelectedIndex(prev => Math.min(prev + 1, filteredList.length - 1));
  //         break;
  //       case 'ArrowUp':
  //         event.preventDefault();
  //         setSelectedIndex((prevIndex) =>
  //           prevIndex > 0 ? prevIndex - 1 : prevIndex
  //         );
  //         break;
  //       case 'Enter':
  //         event.preventDefault();
  //         if (selectedIndex >= 0) {
  //            handleSelectPrimaryItem(index, filteredItems[selectedIndex]);
  //           // handleSelectPrimaryItem(index, filteredList[selectedIndex]);
  //           //  handleSelectGiftItem(index, filteredList[selectedIndex]);
  //         }
  //         break;
  //       case 'Escape':
  //         setActiveDropdown(null); // Close dropdown on Escape
  //         break;
  //       default:
  //         break;
  //     }
  //   }

    
  // };



  const handleKeyDown = (index, event, type) => {
    const filteredList = type === 'primary' ? filteredPrimaryItems : filteredGiftItems;
    const setActiveDropdown = type === 'primary' ? activePrimaryDropdown : activeGiftDropdown;

    if (setActiveDropdown === index) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) => (prev < filteredList.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0) {
            type === 'primary'
              ? handleSelectPrimaryItem(index, filteredList[selectedIndex])
              : handleSelectGiftItem(index, filteredList[selectedIndex]);
          }
          break;
        case 'Escape':
          type === 'primary' ? setActivePrimaryDropdown(null) : setActiveGiftDropdown(null);
          break;
        default:
          break;
      }
    }
  };


  const handleOutsideClick = (e) => {
    if (dropdownRefs.current) {
      const isClickInsideDropdown = dropdownRefs.current.some(ref => ref && ref.contains(e.target));
      if (!isClickInsideDropdown) {
        //setActiveDropdown(null); // Close dropdown if clicked outside
        setActivePrimaryDropdown(null);
        setActiveGiftDropdown(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const gotodashboard = () => {
    
    //navigate('/Dashboard/');
    //navigate('/Dashboard/', { state: { userDetails } });
    navigate('/Dashboard/', { state: { userDetails } });
    //navigate('/Dashboard', { state: { userDetails: response.data.user } });
  };
  
  const addItem = () => {
    setOrderItems([...orderItems, { product_name: '', gift_product: '', quantity: 1 }]);
  };

  const removeItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = { orderDate, customerName, customerMobile, customerEmail, orderItems };
    try {
      await axios.post('http://localhost:5000/api/OrderForm', orderData);
      //await axios.post('http://promotion.altelal.com/api/OrderForm', orderData);
      alert('Entry Saved Successfully.');
      setOrderDate(new Date().toISOString().split('T')[0]);
      setCustomerName('');
      setCustomerMobile('');
      setCustomerEmail('');
      setOrderItems([{ product_name: '', gift_product: '', quantity: 1 }]);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="order-container">
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="header">
        <h1>Telal Promotions</h1>
        <div className="logindet">
          <h2>{userDetails?.userid || 'N/A'}</h2>
          <h2>{userDetails?.branch || 'N/A'}</h2>
        </div>
      </div>
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="order-details">
          <h2 style={{ color: '#ad7831', fontSize: '20px' }}>Customer Details</h2>
          <div className="form-group">
            <label className="form-label">Order Date:</label>
            <input
              type="date"
              className="form-input"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Customer Name:</label>
            <input
              type="text"
              className="form-input"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Mobile No:</label>
            <input
              type="text"
              className="form-input"
              value={customerMobile}
              onChange={(e) => setCustomerMobile(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-input"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="item-details">
          <h2>Item Details</h2>
          <table className="item-table">
            <thead>
              <tr>
                <th>Primary Product</th>
                <th>Gift Product</th>
                <th>Quantity</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="product_name"
                      value={item.product_name}
                      onChange={(e) => handleFilterChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e, 'primary')}
                      required
                    />
                    {activePrimaryDropdown === index && filteredPrimaryItems.length > 0 && (
                      <ul className="dropdown" ref={(el) => dropdownRefs.current[index] = el}>
                        {filteredPrimaryItems.map((filteredItem, idx) => (
                          <li
                            key={idx}
                            className={selectedIndex === idx ? 'selected' : ''}
                            onClick={() => handleSelectPrimaryItem(index, filteredItem)}
                          >
                            {filteredItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  <td>
                    <input
                      type="text"
                      name="gift_product"
                      value={item.gift_product}
                      onChange={(e) => handleGiftFilterChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e, 'gift')}
                      required
                    />
                    {activeGiftDropdown  === index && filteredGiftItems.length > 0 && (
                      <ul className="dropdown1" ref={(el) => dropdownRefs.current[index] = el}>
                        {filteredGiftItems.map((giftItem, idx) => (
                          <li
                            key={idx}
                            className={selectedIndex === idx ? 'selected' : ''}
                            onClick={() => handleSelectGiftItem(index, giftItem)}
                          >
                            {giftItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  
{/* 
                  <td>
                    <input
                      type="text"
                      name="gift_product"
                      value={item.gift_product}
                      onChange={(e) => handleItemChange(index, e)}
                      required
                    />
                  </td> */}
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      min="1"
                      max="9"
                      onChange={(e) => handleItemChange(index, e)}
                      required
                    />
                  </td>
                  {/* <td>
                    <button
                      type="button"
                      className="remove-item-button"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button type="button" className="add-item-button" onClick={addItem}>
            Add Item
          </button> */}
        </div>

        <button type="submit" className="submit-button">Submit Order</button>

        <div>
      <button type="Dashboard" className="dashboard-btn" onClick={gotodashboard} >Home</button>
    </div>
      </form>
    </div>
    
  );
}

export default OrderForm;
