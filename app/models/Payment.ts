import { PaymentMethod } from "./PaymentMethod";
import { PostImage } from "./PostImage";
import { User } from "./User";

export class Payment {
  constructor(
    public id: string,
    public title: string,
    public type: "to" | "from",
    public device: string,
    public discount: number,
    public amount: number,
    public verified_at: { date: string, relative: string },
    public user: User,
    public method: PaymentMethod,
  ) { }
}
