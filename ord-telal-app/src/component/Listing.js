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
import { ListingContext , ListingProvider} from './context/ListingContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Listing.css'; // Add external CSS file
import { Link } from 'react-router-dom';
import outlogo from './Images/logout.png'; 
import Swal from 'sweetalert2';


import OrderForm from './OrderForm';
//import Listing from './Listing';
//import Dashboard from './Dashboard';


function Listing() {
  const [listing, setlisting] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  //const { listing, setlisting } = useContext(ListingContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = location.state?.userDetails;

  // Fetch gift item counts
  useEffect(() => {
    console.log('Listing component mounted');
    const fetchListingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/detailslist'); // API call
        
        //const response = await axios.get('http://promotion.altelal.com/api/detailslist'); // API call
        console.log('Listing API Response:', response.data);
        setlisting(response.data); // Set the data from API response
        
      } catch (error) {
        console.error('Error fetching listing data', error);
      }
    };

    fetchListingData();
  }, []);

 // Pagination Logic
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentListing = listing.slice(indexOfFirstItem, indexOfLastItem);

 // Change Page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);


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

        <h4>Listing</h4>

        <table className="gift-summary-table">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Customer</th>
              <th>Gift Item</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {currentListing.length > 0 ? (
              currentListing.map((row, index) => (
                <tr key={index}>
                  <td>{row.Branch}</td>
                  <td>{row.Cust}</td>
                  <td>{row.Gift}</td>
                  <td>{row.Qty}</td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

 {/* Pagination Controls */}
 <div className="pagination">
          {[...Array(Math.ceil(listing.length / itemsPerPage))].map((_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${index + 1 === currentPage ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Listing;


