import { PieChart } from "react-native-svg-charts";
import UIService from "../../../services/UIService";
import colors from "../../../config/colors";
import { Box, Center, Text } from "native-base";
import UtilService from "../../../services/UtilService";

export function FinancialPieChart(props) {
  const data = [+props.cost, +props.platform_charges, +props.prize_money];
  const chartColors = [
    colors.primaryColor,
    colors.dimTextColor,
    colors.secondaryColor,
  ];

  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: chartColors[index],
        onPress: () => {},
      },
      key: `pie-${index}`,
    }));

  return (
    <PieChart
      style={{ height: 90, width: 90 }}
      innerRadius={"66%"}
      data={pieData}
    />
  );
}
export function BusinessCard({ color, amount, participation }) {
  return (
    <Box bg={`${color}.100`} px={4} py={2} borderRadius="md" shadow={3}>
      <Text fontSize="xs" fontWeight="bold" color={`${color}.400`}>
        Estimated Profit
      </Text>
      <Center>
        <Text fontSize="md" fontWeight="bold" color={`${color}.500`} mt={3 / 2}>
          Rs.{UtilService.number(amount)}
        </Text>
      </Center>
      <Text fontSize={10} color={`blueGray.500`} textAlign="center" mt={3 / 2}>
        at {participation}% participation
      </Text>
    </Box>
  );
}
