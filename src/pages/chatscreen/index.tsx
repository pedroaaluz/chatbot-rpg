import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Button, VStack, HStack, Center, Text } from "@chakra-ui/react";
import './index.css'

interface Message {
  id: number;
  text: string;
}

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: newMessage },
    ]);

    setNewMessage("");
  };

  useEffect(() => {
    // Scroll para a parte inferior quando uma nova mensagem é adicionada
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Center

      bgGradient={'linear(to-b, #3e455a, #0f1319)'}
      height="100vh"
    >
      <Box
        p={4}
        height="100vh"
        width={"80vh"}
        display="flex"
        flexDirection="column"
        overflowY="hidden" // Desative o scroll no contêiner principal
      >
        <VStack p={4} spacing={6} align="stretch" overflowY="auto" ref={inputRef} flex={1}>
            {messages.map((message) => (
              <Box 
                borderColor={'#C2CCDB'} 
                borderWidth={2}
                bgColor={'#C2CCDB'} 
                key={message.id}
                p={2}
                borderRadius="md"
              >
                <Text  color={'#0074C8'}>
                  {message.text}
                </Text>
              </Box>
            ))}
        </VStack>
  
        <HStack mt={4} align="stretch">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            borderColor={'#0074C8'} 
            bgColor={'#C2CCDB'}
            color={'#0074C8'}
            onChange={(e) => setNewMessage(e.target.value)}
            alignSelf="flex-end"
          />
          <Button bgColor={'#0074C8'} color={'#C2CCDB'} onClick={sendMessage}>
            Enviar
          </Button>
        </HStack>
      </Box>
    </Center>
  );
};
