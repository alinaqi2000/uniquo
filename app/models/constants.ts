import { Competition } from "./Competition";
import { OrganizerCompetition } from "./OrganizerCompetition";

export type COMPETITION_STAGE = "payment_verification_pending" |
    "pending_publish" |
    "participation_period" |
    "voting_period" |
    "completed";


export type BaseCompetition = Competition | OrganizerCompetition