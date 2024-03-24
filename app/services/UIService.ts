// import { Toast } from "native-base";
import { showMessage } from "react-native-flash-message";
import moment from 'moment';
import colors from "../config/colors";
import { BaseCompetition } from "../models/constants";
import UtilService from "./UtilService";

export default class UIService {
    static showErrorToast(description: string, title?: string) {
        showMessage({
            message: description,
            // description,
            type: "danger",
            duration: 5000,
            position: "bottom",
        });
    }
    static showSuccessToast(description: string, title?: string) {
        showMessage({
            message: description,
            // description,
            type: "success",
            duration: 5000,
            position: "bottom",
        });
    }
    static competitionDisplayColor(competition: BaseCompetition): string {
        switch (competition.stage) {
            case "payment_verification_pending":
                return colors.secondaryBg
            default:
                return competition.bgColor;
        }
    }

    static randomCompetitionColor() {
        const randomNo = Math.ceil(
            (Math.random() * colors.competitionColors.length) %
            colors.competitionColors.length);
        return colors.competitionColors[randomNo - 1]
    }
    static currency(number: number | string) {
        return "Rs." + UtilService.number(number);
    }
    static competitionDateAndTitle(competition: BaseCompetition) {
        switch (competition.stage) {
            case "payment_verification_pending":
                return { title: "PAYMENT", date: "PENDING" }

            default:
                const currentDateTime = moment();
                const votingStartDateTime = moment(`${competition.voting_start_at} ${competition.voting_time}`, "MMM DD, YYYY HH:mm");
                const announcementDateTime = moment(`${competition.announcement_at} ${competition.announcement_time}`, "MMM DD, YYYY HH:mm");

                if (currentDateTime.isBefore(votingStartDateTime)) {
                    return { title: "VOTING", date: competition.voting_start_at }
                } else if (currentDateTime.isBetween(votingStartDateTime, announcementDateTime)) {
                    return { title: "ANNOUNCEMENT", date: competition.announcement_at }
                } else {
                    return { title: "ANNOUNCED", date: competition.announcement_at }
                }
        }
    }

}