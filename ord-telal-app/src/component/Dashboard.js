// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard.css'; // Add external CSS file
// import { Link } from 'react-router-dom';

// function Dashboard() {
//   const [giftCounts, setGiftCounts] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userDetails = location.state?.userDetails;

//   // Fetch gift item counts
//   useEffect(() => {
//     const fetchGiftCounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/giftcount'); // API call
//         setGiftCounts(response.data); // Set the data from API response
//       } catch (error) {
//         console.error('Error fetching gift counts:', error);
//       }
//     };

//     fetchGiftCounts();
//   }, []);

//   const goToOrderForm = () => {
//     navigate('/OrderForm', { state: { userDetails } });
//   };

//   return (
//     <div className="dashboard">



//       <h3>Welcome, {userDetails?.userid || 'User'} @ {userDetails?.branch || 'N/A'}</h3>

//       <div className="menu">
//         <button className="menu-btn" onClick={goToOrderForm}>Promotion Form</button>
//       </div>

//       <h4>Gift Items Summary by Branch</h4>
      
//       <table className="gift-summary-table">
//         <thead>
//           <tr>
//             <th>Branch</th>
//             <th>Gift Item</th>
//             <th>Total Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {giftCounts.length > 0 ? (
//             giftCounts.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.ordbranch}</td>
//                 <td>{row.detgiftitem}</td>
//                 <td>{row.sum}</td> {/* Assuming the sum column is returned as "sum" */}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="no-data">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect,useContext } from 'react';
import { DashboardContext } from './context/DashboardContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Add external CSS file
import { Link } from 'react-router-dom';
import outlogo from './Images/logout.png'; 

import OrderForm from './OrderForm';
//import Listing from './Listingbk';


function Dashboard() {
  const [giftCounts, setGiftCounts] = useState([]);
  //const { giftCounts, setGiftCounts } = useContext(DashboardContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = location.state?.userDetails;

  // Fetch gift item counts
  useEffect(() => {
    const fetchGiftCounts = async () => {
       try {
         const response = await axios.get('http://localhost:5000/api/giftcount'); // API call
         //const response = await axios.get('http://promotion.altelal.com/api/giftcount'); // API call
        // const response = await axios.get('http://localhost:5000/detailslist'); // API call
         setGiftCounts(response.data); // Set the data from API response
       } catch (error) {
         console.error('Error fetching gift counts:', error);
       }
    };

    fetchGiftCounts();


    return () => {
      setGiftCounts([]);  // Cleanup to reset the state when component unmounts
    };

  }, []);

  const goToOrderForm = () => {
    navigate('/OrderForm', { state: { userDetails } });
  };

  const gotoListingForm = () => {
    navigate('/Listing',{ state: { userDetails } });
  };

  const gotoDashboard = () => {
    navigate('/Dashboard',{ state: { userDetails } });
  };

  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      // If the user confirms, navigate to the login page
      navigate('/Login');
    };
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <button className="sidebar-btn" onClick={gotoDashboard}>Dashboard</button>
        <button className="sidebar-btn" onClick={goToOrderForm}>Promotion Form</button>
        <button className="sidebar-btn" onClick={gotoListingForm}>Listing</button>
        <button className="sidebar-btn" onClick={logout}> <img src={outlogo} alt="Logout" height={50} className='logout1' /></button>
      </div>

      <div className="dashboard-content">
        <h3>Welcome, {userDetails?.userid || 'User'} @ {userDetails?.branch || 'N/A'}</h3>

        {/* <div className="menu">
          <button className="menu-btn" onClick={OrderForm}>Promotion Form</button>
        </div> */}

        <h4>Gift Items Summary by Branch</h4>

        <table className="gift-summary-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Gift Item</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {giftCounts.length > 0 ? (
              giftCounts.map((row, index) => (
                <tr key={index}>
                  <td>{row.ordbranch}</td>
                  <td>{row.detgiftitem}</td>
                  <td>{row.sum}</td> {/* Assuming the sum column is returned as "sum" */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;


