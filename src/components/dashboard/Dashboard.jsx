import { Link, Outlet, useNavigate } from 'react-router-dom'
import {auth} from '../../firebase';
import {signOut} from 'firebase/auth';

// import Home from './Home';
// import Invoices from './Invoices';
// import NewInvoice from './NewInvoice';
// import Setting from './Setting';
const Dashboard = () => {

  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate('/login');
    }).catch((error) => {
      console.log(error.message);
    });
  }

  return (
    //  full div
    <div className="min-h-screen w-full flex">
      {/* // side navbar */}
      <div className="w-1/5 bg-slate-400"> 
        {/* uppar part of side Navbar */}
        <div className="flex items-center p-2">   
          <img 
          className="w-16 h-16 rounded-full"
          src={localStorage.getItem('photoURL')} alt="Logo" />
          <div className="flex flex-col pl-4">
          {/* name and Logout */}
          <p className="">
            {localStorage.getItem('cName')}
          </p>
          <button 
          onClick={logout}
          className='bg-cyan-600 text-white'>Logout</button>
          </div>
        </div>
        <hr />
        <div className='flex flex-col w-full '>
          {/* Links */}
          <Link
          className='bg-slate-500 text-white p-2'
          to="/dashboard">
          Home
          </Link>
          <Link to="/dashboard/invoices">Invoices</Link>
          <Link to="/dashboard/new-invoice">New Invoice</Link>
          <Link to="/dashboard/setting">Setting</Link>
        </div>
      </div>
      <div className="w-4/5 bg-zinc-500">
        {/* <h1>Main Content</h1> */}
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
