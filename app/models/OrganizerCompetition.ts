import { Category } from "./Category";
import { Payment } from "./Payment";
import { User } from "./User";
import { COMPETITION_STAGE } from "./constants";

export class OrganizerCompetition {
  constructor(
    public id: number = Math.floor(Math.random() * 1000),
    public title: string = "",
    public description: string = "",
    public slug: string = "",
    public paid: boolean = true,
    public financials: {
      entry_fee: number,
      cost: number,
      platform_charges: number,
      prize_money: number,
      total_amount: number
    } = {
        entry_fee: 0,
        cost: 0,
        platform_charges: 0,
        prize_money: 0,
        total_amount: 0
      },
    public participations: number = 0,
    public participants_allowed: number = 0,
    public voting_start_at: string = "",
    public voting_time: string = "",
    public announcement_at: string = "",
    public announcement_time: string = "",
    public stage: COMPETITION_STAGE = "payment_verification_pending",
    public expired: boolean = false,
    public category: Category = new Category(),
    public organizer: User = new User(),
    public winner: User | null = null,
    public payment: Payment,
    public bgColor: string = ""
  ) {
  }

}
