import botAvatar from "./../../images/botAvatar.jpeg";
import userAvatar from "./../../images/imperial.jpg";
import {
  HStack,
  Text,
  Avatar,
  SlideFade,
  VStack,
  Image,
  Card,
  Stack,
  CardBody
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type IMessageBoxProps = PropsWithChildren<{
  isBot: boolean;
  text: string;
  id: number;
  image?: string;
}>;

const defaultMessage = (message: IMessageBoxProps) => {
  return (
    <HStack
      borderWidth={2}
      bgColor={"#C2CCDB"}
      key={message.id}
      p={2}
      borderRadius="md"
    >
      <Avatar src={message.isBot ? botAvatar : userAvatar} />
      <VStack>
        <Text noOfLines={[10000]} color={"#0074C8"}>
          {message.text}
        </Text>
      </VStack>
    </HStack>
  );
};

const imageMessage = (message: IMessageBoxProps) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bgColor={"#C2CCDB"}
    >
      <Image
        objectFit="cover"
        maxH={'200px'}
        maxW={'200px'}
        src={message.image}
        alt="image-status"
      />

      <Stack>
        <CardBody>
          <Text py="2"  color={"#0074C8"}>{message.text}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export const MessageBox = (message: IMessageBoxProps): JSX.Element => {
  return (
    <>
      <SlideFade in={true}>
        {message.image ? imageMessage(message) : defaultMessage(message)}
      </SlideFade>
    </>
  );
};
