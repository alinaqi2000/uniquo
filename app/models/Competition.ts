import { Category } from "./Category";
import { User } from "./User";

export class Competition {
  constructor(
    public id: number,
    public participated: boolean,
    public title: string,
    public description: string,
    public slug: string,
    public entry_fee: number,
    public prize_money: number,
    public participations: number,
    public participants_allowed: number,
    public voting_start_at: string,
    public voting_time: string,
    public announcement_at: string,
    public announcement_time: string,
    public expired: boolean,
    public category: Category,
    public organizer: User,
    public winner: User | null
  ) {}
}
