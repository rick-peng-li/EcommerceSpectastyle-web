import AssessmentIcon from '@mui/icons-material/Assessment';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AllAgents from './AllAgents';
import AllUsers from './AllUsers';
import Products from './Products';
import ManagerLogin from './ManagerLogin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useState } from 'react';
import { Button } from '@mui/material';
import AllProducts from './AllProducts';
import '../css/Dashboard.css'

const Dashboard = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [allusers, setAllusers] = useState(false);
  const [alltransition, setAlltransition] = useState(false);
  const [managerlogin, setmanagerlogin] = useState(false);
  const [userbalance, setuserbalance] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
    setAllusers(false)
    setAlltransition(false);
    setmanagerlogin(false);
    setuserbalance(false);
  };

  const toggleAllusers = () => {
    setAllusers(!allusers);
    setShowRegistration(false)
    setAlltransition(false);
    setmanagerlogin(false)
    setuserbalance(false);
  };

  const toggleAlltransition = () => {
    setAlltransition(!alltransition);
    setShowRegistration(false)
    setAllusers(false)
    setmanagerlogin(false)
    setuserbalance(false);
  };

  const togglemanagerlogin = () => {
    setmanagerlogin(!managerlogin);
    setShowRegistration(false)
    setAllusers(false)
    setAlltransition(false);
    setuserbalance(false);
  }

  const togglebalance = () => {
    setuserbalance(!userbalance);
    setShowRegistration(false)
    setAllusers(false)
    setAlltransition(false);
    setmanagerlogin(false);
  }

  return (
    <div className="Container">
      <nav>
        <h1><WarehouseIcon />&nbsp;WAREHOUSE&nbsp;<WarehouseIcon />&nbsp;&nbsp;&nbsp;<DashboardIcon />&nbsp;DASHBOARD&nbsp;<DashboardIcon /></h1>
      </nav>
      <div className="side-dash">
        <div className="outer-container">
          <h3 className='my-main-route' onClick={toggleDropdown}>
            <AssessmentIcon />&nbsp;Super User (Manager) (Agent)
          </h3>
          {showDropdown && (
            <div className="sidebar-menu">
              <div className="register-user" onClick={toggleRegistration}>
                <HowToRegIcon style={{
                  border: '2px solid white',
                  width: '18px',
                  height: '18px',
                  color: 'rgb(78, 70, 182)',
                  backgroundColor: 'white',
                  borderRadius: '10px'
                }} />
                <span>All Agents</span>
              </div>
              {showRegistration && <AllAgents />}

              <div className="All-myUser" onClick={toggleAllusers}>
                <PeopleAltIcon style={{
                  border: '2px solid white',
                  width: '18px',
                  height: '18px',
                  color: 'rgb(78, 70, 182)',
                  backgroundColor: 'white',
                  borderRadius: '10px'
                }} />
                <span>All Users</span>
              </div>
              {allusers && <AllUsers />}

              <div className="All-myUser" onClick={toggleAlltransition}>
                <ProductionQuantityLimitsIcon style={{
                  border: '2px solid white',
                  width: '18px',
                  height: '18px',
                  color: 'rgb(78, 70, 182)',
                  backgroundColor: 'white',
                  borderRadius: '10px'
                }} />
                <span>Products Manipulation</span>
              </div>
              {alltransition && <Products />}

              <div className="All-myUser" onClick={togglebalance}>
                <AccountBalanceWalletIcon style={{
                  border: '2px solid white',
                  width: '18px',
                  height: '18px',
                  color: 'rgb(78, 70, 182)',
                  backgroundColor: 'white',
                  borderRadius: '10px'
                }} />
                <span>All Products</span>
              </div>
              {userbalance && <AllProducts />}
            </div>
          )}

          <div className="manager-login-bottom">
            <Button onClick={togglemanagerlogin} style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }} variant='contained'>Login as Manager</Button>
          </div>

          {managerlogin && <ManagerLogin />}
        </div>
      </div>
      <div className="image-warehouse">
        <p><WarehouseIcon /></p>
      </div>
    </div>
  );
};

export default Dashboard;
