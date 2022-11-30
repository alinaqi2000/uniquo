import { Category } from "../../models/Category";
import { Competition } from "../../models/Competition";
import { User } from "../../models/User";
import {
  CompetitionsActions,
  SET_MY_COMPETITIONS,
  SET_RECENT_COMPETITIONS,
  SET_FEED_COMPETITIONS,
} from "./competitions.actions";

export interface CompetitionsState {
  feed: Competition[];
  my: Competition[];
  recent: Competition[];
}
const initialState: CompetitionsState = {
  feed: [
    new Competition(
      1,
      false,
      "Sargodha Cars Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sargodha-cars-competition",
      100,
      5000,
      5000,
      500,
      "Sep 16, 2022",
      "16:01",
      "Sep 16, 2022",
      "06:14",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Imran ",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
      ),
      null
    ),
    new Competition(
      2,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      3,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      4,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      5,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      6,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      7,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      8,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      9,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
    new Competition(
      10,
      false,
      "Sports Competition",
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      "sports-competition",
      100,
      5000,
      5000,
      500,
      "Sep 24, 2022",
      "17:00",
      "Sep 28, 2022",
      "17:00",
      false,
      new Category(1, "Cars", "cars"),
      new User(
        "Organizer User",
        "organizer.user@gmail.com",
        "organizer.user",
        "https://media.istockphoto.com/id/951331792/photo/portrait-of-uncertain-young-stylish-stubble-man-with-trendy-round-glasses-wears-demin-blue.jpg?s=612x612&w=0&k=20&c=SjjSwn1MLUo9rjYGwXc8xTWnq8LP_g6e9K7Zxe0I3qs="
      ),
      null
    ),
  ],
  my: [
    // new Competition(2, "Art & Culture", "art-culture"),
    // new Competition(1, "Sports", "sports"),
    // new Competition(4, "Cars", "cars"),
    // new Competition(3, "Memes", "memes"),
  ],
  recent: [
    // new Competition(3, "Memes", "memes"),
    // new Competition(2, "Art & Culture", "art-culture"),
    // new Competition(4, "Cars", "cars"),
    // new Competition(1, "Sports", "sports"),
  ],
};

export default (
  state = initialState,
  action: CompetitionsActions
): CompetitionsState => {
  switch (action.type) {
    case SET_FEED_COMPETITIONS:
      return {
        ...state,
        feed: action.payload,
      };
    case SET_MY_COMPETITIONS:
      return {
        ...state,
        my: action.payload,
      };
    case SET_RECENT_COMPETITIONS:
      return {
        ...state,
        recent: action.payload,
      };

    default:
      return state;
  }
};
