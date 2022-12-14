import { useContext, useEffect, useState } from 'react'
import service from './services/services'
import { Routes, Route, NavLink } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import { PublicRoutes } from './Routes/PublicRoutes'
import { PrivateRoutes } from './Routes/PrivateRoutes'

import { LoginForm } from './components/LoginRegister/LoginForm'
import { RegisterForm } from './components/LoginRegister/RegisterForm'
import { Home } from './components/Home/Home'
import { EditOperationForm } from './components/nav/EditOperationForm'
import { EditUserProfileImg } from './components/nav/EditUserProfileImg'
import { EditUserPassword } from './components/nav/EditUserPassword'

const App = () => {
	const { user, setUser } = useContext(UserContext)
	const [display, setDisplay] = useState(true)

	useEffect(() => {
		const userData = window.localStorage.getItem('userData')
		if (userData) {
			const userCredentials = JSON.parse(userData)
			setUser(userCredentials)
			service.setToken(userCredentials.token)
		}
	}, [setUser])

	const handleLogout = () => {
		window.localStorage.removeItem('userData')
		setUser(undefined)
	}

	const handleHidden = () => setDisplay(!display)

	return (
		<div className="App">
			<header className="header">
				<h1>Personal Pudget</h1>
				<nav>
					{user ? (
						<ul className="header-menu">
							<li>
								<NavLink to="/">Home</NavLink>
							</li>
							<li className="container-drop-menu">
								<span onClick={handleHidden} className="drop-menu-button">
									Config
								</span>
								<ul className={`dropdown-menu ${display ? 'hidden-menu' : ''}`}>
									<li>
										<NavLink to="/user/profile">change profile image</NavLink>
									</li>
									<li>
										<NavLink to="/user/password">change password</NavLink>
									</li>
								</ul>
							</li>
							<li className="menu-logout-button" onClick={handleLogout}>
								Logout
							</li>
						</ul>
					) : (
						<ul className="header-menu">
							<li>
								<NavLink to="/login">Log in</NavLink>
							</li>
							<li>
								<NavLink to="/register">Sign in</NavLink>
							</li>
						</ul>
					)}
				</nav>
			</header>
			<main className="body">
				<Routes>
					<Route
						path="/register"
						element={
							<PublicRoutes>
								<RegisterForm />
							</PublicRoutes>
						}
					/>
					<Route
						path="/login"
						element={
							<PublicRoutes>
								<LoginForm />
							</PublicRoutes>
						}
					/>
					<Route
						path="/"
						element={
							<PrivateRoutes>
								<Home />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/user/profile"
						element={
							<PrivateRoutes>
								<EditUserProfileImg />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/user/password"
						element={
							<PrivateRoutes>
								<EditUserPassword />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/operation/:id"
						element={
							<PrivateRoutes>
								<EditOperationForm />
							</PrivateRoutes>
						}
					/>
				</Routes>
			</main>
		</div>
	)
}

export default App
