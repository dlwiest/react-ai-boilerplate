import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import ResponsiveContentArea from './ResponsiveContentArea'

const Navbar = () => {
	return (
		<Box bg={'gray.100'} py={3}>
			<ResponsiveContentArea>
				<Flex grow={1}>
					<span>React AI App</span>
				</Flex>
			</ResponsiveContentArea>
		</Box>
	)
}

export default Navbar
