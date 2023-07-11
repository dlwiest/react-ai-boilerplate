import React from 'react'
import Home from './pages/Home/Home'
import { Box, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './layout/Navbar'
import ResponsiveContentArea from './layout/ResponsiveContentArea'

const App = () => {
	return (
		<Box>
			<Navbar />
			<ResponsiveContentArea>
				<Flex pt={2} grow={1}>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</Flex>
			</ResponsiveContentArea>
		</Box>
	)
}

export default App
