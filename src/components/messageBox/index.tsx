import botAvatar from "./../../images/botAvatar.jpeg";
import userAvatar from "./../../images/imperial.jpg";
import { HStack, Text, Avatar, SlideFade } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type IMessageBoxProps = PropsWithChildren<{
  isBot: boolean;
  text: string;
  id: number;
}>;

export const MessageBox = (message: IMessageBoxProps): JSX.Element => {
  return (
    <>
      <SlideFade in={true} >
        <HStack
          borderColor={"#C2CCDB"}
          borderWidth={2}
          bgColor={"#C2CCDB"}
          key={message.id}
          p={2}
          borderRadius="md"
        >
          <Avatar src={message.isBot ? botAvatar : userAvatar} />
          <Text noOfLines = { [ 10000 ] } color={"#0074C8"}>{message.text}</Text>
        </HStack>
      </SlideFade>
    </>
  );
};
