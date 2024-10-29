import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderForm from './component/OrderForm';
import Login from './component/login';
import Dashboard from './component/Dashboard';
import { DashboardProvider } from './component/context/DashboardContext';
import { ListingProvider } from './component/context/ListingContext';
import Listing from './component/Listing';
import  { createContext, useState, useContext } from 'react';


//import Dashboard from './Dashboard'; // Import the Dashboard component

// function App() {
//   return (
//     <div className="App">
      
//     <Login/> 
//     </div>
//   );
// }

// export default App;

const DashboardContext = createContext();

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Listing" element={<Listing />} /> 


      {/* Landing page with nested routes */}
      <Route path="/Dashboard" element={<Dashboard />}>
          {/* Nested routes will be rendered inside <Outlet> */}
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Listing" element={<Listing />} />
          </Route>



          <Route path="*" element={<Login />} />
          {/*<Route path="/Listing" element={<Listing />} />*/}
          <Route path="/OrderForm" element={<OrderForm />} /> {/* Protected route */}

    </Routes>
  </Router>,
  document.getElementById('root')
);

// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './component/Dashboard'; // Update paths based on your structure
// import Listing from './component/Listing';
// import OrderForm from './component/OrderForm';
// import Login from './component/login'; // Make sure this path is correct
// import { DashboardProvider } from './component/context/DashboardContext';
// import { ListingProvider } from './component/context/ListingContext';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default login route */}
//         <Route path="/" element={<Login />} />  
        
//         {/* Dashboard route */}
//         <Route
//           path="/Dashboard"
//           element={
//             <DashboardProvider>
//               <Dashboard />
//             </DashboardProvider>
//           }
//         />
        
//         {/* Listing route */}
//         <Route
//           path="/Listing"
//           element={
//             <ListingProvider>
//               <Listing />
//             </ListingProvider>
//           }
//         />
        
//         {/* Order form route */}
//         <Route path="/OrderForm" element={<OrderForm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Dashboard"
          element={
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          }
        />
        <Route
          path="/Listing"
          element={
            <ListingProvider>
              <Listing />
            </ListingProvider>
          }
        />

        <Route path="/OrderForm" element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;