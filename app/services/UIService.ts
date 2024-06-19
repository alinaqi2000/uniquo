// import { Toast } from "native-base";
import { showMessage } from "react-native-flash-message";
import moment from 'moment';
import colors from "../config/colors";
import { BaseCompetition } from "../models/constants";
import UtilService from "./UtilService";

export default class UIService {
    static showErrorToast(description: string, title?: string) {
        if (title) {
            showMessage({
                message: title,
                description, type: "danger",
                duration: 5000,
                position: "bottom",
            });
        } else {
            showMessage({
                message: description,
                description, type: "danger",
                duration: 5000,
                position: "bottom",
            });
        }
    }
    static showSuccessToast(description: string, title?: string) {
        if (title) {
            showMessage({
                message: title,
                description,
                type: "success",
                duration: 5000,
                position: "bottom",
            });
        } else {
            showMessage({
                message: description,
                type: "success",
                duration: 5000,
                position: "bottom",
            });
        }
    }
    static competitionDisplayColor(competition: BaseCompetition): string {
        switch (competition.stage) {
            case "payment_verification_pending":
                return colors.secondaryBg;
            case "pending_publish":
                return "amber.600";
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
    static competitionStatus(competition: BaseCompetition) {
        switch (competition.stage) {
            case "payment_verification_pending":
                return { title: "PAYMENT", sub_title: "PENDING" }
            case "pending_publish":
                return { title: "PUBLISH", sub_title: "PENDING" }
            default:
                const currentDateTime = moment();
                const votingStartDateTime = moment(`${competition.voting_start_at} ${competition.voting_time}`, "MMM DD, YYYY HH:mm");
                const announcementDateTime = moment(`${competition.announcement_at} ${competition.announcement_time}`, "MMM DD, YYYY HH:mm");

                if (currentDateTime.isBefore(votingStartDateTime)) {
                    return { title: "VOTING", sub_title: competition.voting_start_at }
                } else if (currentDateTime.isBetween(votingStartDateTime, announcementDateTime)) {
                    return { title: "ANNOUNCEMENT", sub_title: competition.announcement_at }
                } else {
                    return { title: "ANNOUNCED", sub_title: competition.announcement_at }
                }
        }
    }

}