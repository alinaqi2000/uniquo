import { Category } from "./Category";
import { Post } from "./Post";
import { User } from "./User";
import { COMPETITION_STAGE } from "./constants";
import { DraftCompetition } from "./form/DraftCompetition";

export class Competition {
  constructor(
    public id: number = Math.floor(Math.random() * 1000),
    public participated: boolean = false,
    public title: string = "",
    public description: string = "",
    public slug: string = "",
    public paid: boolean = true,
    public financials: {
      entry_fee: number,
      prize_money: number,
      total_amount: number
    } = {
        entry_fee: 0,
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
    public winners: User[] = [],
    public bgColor: string = "",
    public myDraftPosts: Post[] = [],
    public myPost: Post | null = null
  ) {
  }

  static fromData(data: any) {
    return new Competition(data.id,
      data.participated,
      data.title,
      data.description,
      data.slug,
      data.paid,
      data.financials,
      data.participations,
      data.participants_allowed,
      data.voting_start_at,
      data.voting_time,
      data.announcement_at,
      data.announcement_time,
      data.stage,
      data.expired,
      data.category,
      data.organizer,
      data.winner,
      data.bgColor,
      data.myDraftPosts,
      data.myPost
    );
  }
}
