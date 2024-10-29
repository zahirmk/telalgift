import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Listing.css'; 
import OrderForm from './OrderForm';
//import Listing from './Listing';

function Listing({ branch }) {
  const [fetchOrderDetails, setFetchOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = location.state?.userDetails;

  // Fetch order details from the API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/fetchDetails', {
        //   params: { branch }, // Pass branch as a query parameter if necessary
        // }
        // );
        const response = await axios.get('http://localhost:5000/api/detailslist'); // API call
       
        setFetchOrderDetails(response.data); // Set the data from API response
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [branch]);

  const goToOrderForm = () => {
    navigate('/OrderForm', { state: { userDetails } });
  };

  const gotoListingForm = () => {
    navigate('/Listing');
  };

  const gotoDashboard = () => {
    navigate('/Dashboard', { state: { userDetails } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="listing-page">
      <div className="sidebar">
        <button className="sidebar-btn" onClick={gotoDashboard}>Dashboard</button>
        <button className="sidebar-btn" onClick={goToOrderForm}>Promotion Form</button>
        <button className="sidebar-btn" onClick={gotoListingForm}>Listing</button>
      </div>
      <div className="listing-content">
        <h4>Listing Page</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Gift Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {fetchOrderDetails.map((order, index) => (
              <tr key={index}>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td>{order.mobile}</td>
                <td>{order.giftItem}</td>
                <td>{order.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listing;
