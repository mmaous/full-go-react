import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';
import { FC } from 'react';

interface Props extends ChakraProviderProps {
	children: React.ReactNode;
}

const Chakra: FC<Props> = ({ children, ...props }) => <ChakraProvider {...props}>{children}</ChakraProvider>;

export default Chakra;
