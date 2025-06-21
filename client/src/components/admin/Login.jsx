import React, { useState } from 'react'

const Login = () => {


	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
	}
  return (
	  <div className='flex items-center justify-center h-screen'>
		  <div className='w-full max-w-sm px-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg py-6'>
			  <div className='flex flex-col items-center justify-center'>
				  <div className='w-full py-6 text-center'>
					  <h1 className='text-3xl font-bold '><span className='text-primary'>Admin</span> Login</h1>
					  <p className='font-light'>Enter your credentials to access Admin Page</p>
				  </div>
				  <form action="" onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
						<div className='flex flex-col'>
							<label htmlFor="email">Email</label>
							<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required placeholder='Enter your email' className='border border-primary/30 rounded-lg p-2 mb-6' />
						</div>
						<div className='flex flex-col'>
							<label htmlFor="password">Password</label>
							<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required placeholder='Enter your password' className='border border-primary/30 rounded-lg p-2 mb-6' />
						</div>
						<button type="submit" className='w-full bg-primary text-white py-2 rounded-lg hover:scale-105 transition-all cursor-pointer'>Login</button>
				  </form>
			  </div>
		  </div>
	</div>
  )
}

export default Login
