import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Icon,
  Link,
  StatusBar,
  Text,
  View,
  VStack,
} from "native-base";

import Feed from "../../components/layout/AppLayout";
import colors from "../../config/colors";
import UserAvatar from "../../components/utility/images/UserAvatar";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SecondaryIconButton from "../../components/utility/buttons/SecondaryIconButton";
import CategoryItem from "../../components/utility/app/CategoryItem";
import { Category } from "../../models/Category";
import CompetitionItem from "../../components/utility/app/CompetitionItem";
import { Competition } from "../../models/Competition";
import spaces from "../../config/spaces";
import { setFeedCompetitions } from "../../store/competitions/competitions.actions";
import { User } from "../../models/User";
import { useDispatch } from "react-redux";

export default function CompetitionFeedScreen({ navigation }) {
  const { user } = useSelector((state: State) => state.app);
  const { feed } = useSelector((state: State) => state.competitions);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   setFeedCompetitions([
    //     new Competition(
    //       1,
    //       false,
    //       "Sargodha Cars Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sargodha-cars-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 16, 2022",
    //       "16:01",
    //       "Sep 16, 2022",
    //       "06:14",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Imran ",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       2,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       3,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       4,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       5,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       6,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       7,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       8,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       9,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //     new Competition(
    //       10,
    //       false,
    //       "Sports Competition",
    //       "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    //       "sports-competition",
    //       { entry_fee: 0, prize_money: 5000, total_amount: 10000 },
    //       5000,
    //       500,
    //       "Sep 24, 2022",
    //       "17:00",
    //       "Sep 28, 2022",
    //       "17:00",
    //       false,
    //       new Category(1, "Cars", "cars"),
    //       new User(
    //         "Organizer User",
    //         "organizer.user@gmail.com",
    //         "organizer.user",
    //         "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
    //       ),
    //       null
    //     ),
    //   ])
    // );
    // return () => {
    //   dispatch(setFeedCompetitions([]));
    // };
  }, []);

  return (
    <Feed>
      <View justifyContent={"center"} mx={spaces.xSpace}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={feed}
          keyExtractor={(item) => `item-${item.id}`}
          renderItem={({ item }: { item: Competition }) => (
            <CompetitionItem navigation={navigation} competition={item} />
          )}
        />
      </View>
    </Feed>
  );
}
