import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
const Layout = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
				<h3
					onClick={() => navigate("/")}
					className="text-primary font-semibold text-2xl cursor-pointer "
				>
					Scriblio
				</h3>
				<button className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer">
					Logout
				</button>
			</div>
			<div className='flex h-[calc(100vh-70px)]'>
				<Sidebar />
				<Outlet />
			</div>
		</>
	);
}

export default Layout
