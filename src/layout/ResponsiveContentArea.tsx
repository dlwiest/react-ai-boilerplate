import { Flex } from '@chakra-ui/react';
import React from 'react';

interface IResponsiveContentAreaProps {
    children: JSX.Element | JSX.Element[];
}

const ResponsiveContentArea = ({ children }: IResponsiveContentAreaProps) => (
    <Flex justifyContent={'space-around'}>
        <Flex maxWidth={'1024px'} flexGrow={1} px={4}>
            {children}
        </Flex>
    </Flex>
);

export default ResponsiveContentArea;