import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Button, VStack, HStack, Center } from "@chakra-ui/react";
import "./index.css";
import { MessageBox } from "../../components/messageBox";
import { Bot } from "../../classes/bot";
import type { IBotQuestion } from "../../types/IQuestion";
import { Interpreter } from "../../classes/interpreter";

interface Message {
  messageId: number;
  text: string;
  isBot: boolean;
}

const bot = new Bot(new Interpreter());

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      messageId: 0,
      text: "Olá, inspetor. Fui acionado porque você identificou uma pessoa com comportamento suspeito. Com a sua colaboração, poderei confirmar essa suspeita, evitando o desperdício de recursos ao punir o infrator. Por favor, responda às minhas perguntas.",
      isBot: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [botQuestion, setBotQuestion] = useState<IBotQuestion>();

  const inputRef = useRef<HTMLDivElement>(null);

  const addMessages = (messages: Message[]) => {
    setMessages((prevMessages) => [...prevMessages, ...messages]);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const nextQuestion = bot.getNextQuestion();

    if (!nextQuestion) {
      console.log("acabou as perguntas");
      addMessages([
        {
          messageId: messages.length + 1,
          isBot: true,
          text: "Inspetor, irei analisar as perguntas.",
        },
      ]);
      return;
    }

    if (!botQuestion) {
      setBotQuestion(nextQuestion);

      addMessages([
        {
          messageId: messages.length + 1,
          text: newMessage,
          isBot: false,
        },
        {
          messageId: messages.length + 2,
          text: nextQuestion.question,
          isBot: true,
        },
      ]);

      return
    }

    const response = bot.responseQuestion(botQuestion!.id, newMessage);

    if (!response) {
      addMessages([
        {
          messageId: messages.length + 1,
          text: newMessage,
          isBot: false,
        },
        {
          messageId: messages.length + 1,
          isBot: true,
          text: "Inspetor, não me faça perder tempo! Seja claro e direto nas respostas.",
        },
      ]);

      return;
    }

    setBotQuestion(nextQuestion);

    if (!nextQuestion) return;

    addMessages([
      {
        messageId: messages.length + 1,
        text: newMessage,
        isBot: false,
      },
      {
        messageId: messages.length + 2,
        text: botQuestion!.question,
        isBot: true,
      },
    ]);

    setNewMessage("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Center bgGradient={"linear(to-b, #3e455a, #0f1319)"}>
      <Box
        p={4}
        height="100vh"
        width={"80vh"}
        display="flex"
        flexDirection="column"
        overflowY="hidden"
      >
        <VStack
          p={4}
          spacing={6}
          align="stretch"
          overflowY="auto"
          ref={inputRef}
          flex={1}
        >
          {messages.map((message) => {
            return (
              <MessageBox
                id={message.messageId}
                isBot={message.isBot}
                text={message.text}
              />
            );
          })}
        </VStack>
        <HStack mt={4} align="stretch">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            borderColor={"#0074C8"}
            bgColor={"#C2CCDB"}
            color={"#0074C8"}
            onChange={(e) => setNewMessage(e.target.value)}
            alignSelf="flex-end"
          />
          <Button bgColor={"#0074C8"} color={"#C2CCDB"} onClick={sendMessage}>
            Enviar
          </Button>
        </HStack>
      </Box>
    </Center>
  );
};
