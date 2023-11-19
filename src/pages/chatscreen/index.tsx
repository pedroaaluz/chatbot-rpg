import React, { useState, useRef, useEffect } from "react";
import { Box, Input, Button, VStack, HStack, Center } from "@chakra-ui/react";
import "./index.css";
import { MessageBox } from "../../components/messageBox";
import { Bot } from "../../classes/bot";
import type { IBotQuestion } from "../../types/IQuestion";
import type { IStatusRules } from "../../types/IStatusRules";
import { Interpreter } from "../../classes/interpreter";
import rebel from "./../../images/rebelde.jpeg";
import contrabandist from "./../../images/contrabandista.png";
import jedi from "./../../images/jedi.jpg";
import kenobi from "./../../images/kenobi.jpg";

interface Message {
  messageId: number;
  text: string;
  isBot: boolean;
  image?: string;
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
  const [finalStatus, setFinalStatus] = useState<IStatusRules>();

  const inputRef = useRef<HTMLDivElement>(null);

  const addMessages = (messages: Message[]) => {
    setMessages((prevMessages) => [...prevMessages, ...messages]);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "" || finalStatus) return;

    // primeira interação
    if (!botQuestion) {
      const firstQuestion = bot.getNextQuestion();
      setBotQuestion(firstQuestion);

      addMessages([
        {
          messageId: messages.length + 1,
          text: newMessage,
          isBot: false,
        },
        {
          messageId: messages.length + 2,
          text: firstQuestion!?.question,
          isBot: true,
        },
      ]);

      setNewMessage("");
      return;
    }

    // interações restantes
    const response = bot.responseQuestion(botQuestion!.id, newMessage);

    if (!response) {
      addMessages([
        {
          messageId: messages.length + 1,
          text: newMessage,
          isBot: false,
        },
        {
          messageId: messages.length + 2,
          isBot: true,
          text: "Inspetor, não me faça perder tempo! Seja claro e direto nas respostas.",
        },
      ]);

      setNewMessage("");

      return;
    }

    const hasFinalStatus = bot.getFinalStatus();

    if (hasFinalStatus) {
      const imageSelector = {
        kenobi,
        contrabandist,
        rebel,
        imperial: rebel,
        jedi,
      };

      addMessages([
        {
          messageId: messages.length + 1,
          text: newMessage,
          isBot: false,
        },
        {
          messageId: messages.length + 2,
          isBot: true,
          text: hasFinalStatus.message,
          image: imageSelector[hasFinalStatus.status],
        },
      ]);

      setFinalStatus(hasFinalStatus);

      setNewMessage("");
      return;
    }

    const nextQuestion = bot.getNextQuestion();

    setBotQuestion(nextQuestion);

    addMessages([
      {
        messageId: messages.length + 1,
        text: newMessage,
        isBot: false,
      },
      {
        messageId: messages.length + 2,
        text: nextQuestion!?.question,
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
                image={message.image}
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
