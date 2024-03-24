import UtilService from "../../services/UtilService";
import { BaseCompetition } from "../constants";

export class DraftCompetition {
  constructor(
    public category_id: number = 0,
    public category_title: string = "",
    public title: string = "",
    public description: string = "",
    public entry_fee: string = "",
    public prize_money: string = "",
    public participants_allowed: string = "",
    public announcement_at: string = UtilService.generateDateTimeString(),
    public voting_start_at: string = UtilService.generateDateTimeString(),
    public slug: string = "",
    public _id: number = 0,
  ) { }

  static fromBase(competition: BaseCompetition) {
    return new DraftCompetition(
      competition.category.id,
      competition.category.title, competition.title,
      competition.description,
      `${competition.financials.entry_fee}`,
      `${competition.financials.prize_money}`,
      `${competition.participants_allowed}`,
      UtilService.makeDateTimeFromServer(`${competition.announcement_at} ${competition.announcement_time}`),
      UtilService.makeDateTimeFromServer(`${competition.voting_start_at} ${competition.voting_time}`),
      competition.slug,
      competition.id
    )
  }
}
