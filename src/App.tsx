import { ChakraProvider, extendTheme  } from '@chakra-ui/react';
import { ChatScreen } from './pages/chatscreen';
import '@fontsource-variable/space-grotesk'

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})


function App() {
  return (
    <ChakraProvider theme={theme}>
      <ChatScreen />
    </ChakraProvider>
  );
}

export default App;
