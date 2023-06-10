import {
  Box,
  Flex,
  HStack,
  Text,
  Heading,
  Tooltip,
  Td,
  Collapse,
  useDisclosure,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import {
  InfoIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import CopyToClipboard from "./CopyToClipboard";
import { TxnDataType } from "../../types";

const slicedText = (txt: string) => {
  return txt.length > 6
    ? `${txt.slice(0, 4)}...${txt.slice(txt.length - 2, txt.length)}`
    : txt;
};

const TD = ({ txt }: { txt: string }) => (
  <Td>
    <HStack>
      <Tooltip label={txt} hasArrow placement="top">
        <Text>{slicedText(txt)}</Text>
      </Tooltip>
      <CopyToClipboard txt={txt} />
    </HStack>
  </Td>
);

interface TransactionRequestsParams {
  sendTxnData: TxnDataType[];
  setSendTxnData: (value: TxnDataType[]) => void;
}

function TransactionRequests({
  sendTxnData,
  setSendTxnData,
}: TransactionRequestsParams) {
  const { isOpen: tableIsOpen, onToggle: tableOnToggle } = useDisclosure();

  return (
    <Box
      minW={["0", "0", "2xl", "2xl"]}
      overflowX={"auto"}
      mt="2rem"
      pt="0.5rem"
      pl="1rem"
      border={"1px solid"}
      borderColor={"white.800"}
      rounded="lg"
    >
      <Flex py="2" pl="2" pr="4">
        <HStack cursor={"pointer"} onClick={tableOnToggle}>
          <Text fontSize={"xl"}>
            {tableIsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Text>
          <Heading size={"md"}>eth_sendTransactions</Heading>
          <Tooltip
            label={
              <>
                <Text>
                  "eth_sendTransaction" requests by the dApp are shown here
                  (latest on top)
                </Text>
              </>
            }
            hasArrow
            placement="top"
          >
            <Box pb="0.8rem">
              <InfoIcon />
            </Box>
          </Tooltip>
        </HStack>
        <Flex flex="1" />
        {sendTxnData.length > 0 && (
          <Button onClick={() => setSendTxnData([])}>
            <DeleteIcon />
            <Text pl="0.5rem">Clear</Text>
          </Button>
        )}
      </Flex>
      <Collapse in={tableIsOpen} animateOpacity>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>from</Th>
              <Th>to</Th>
              <Th>data</Th>
              <Th>value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sendTxnData.map((d) => (
              <Tr key={d.id}>
                <TD txt={d.from} />
                <TD txt={d.to} />
                <TD txt={d.data} />
                <TD txt={d.value} />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </Box>
  );
}

export default TransactionRequests;
