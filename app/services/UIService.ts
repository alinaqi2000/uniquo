import { Toast } from "native-base";
import { showMessage } from "react-native-flash-message";

export default class UIService {
    static showErrorToast(description: string, title?: string) {
        showMessage({
            message: description,
            // description,
            type: "danger",
            duration: 4000,
            position: "bottom",
        });
        // Toast.show({
        //     title,
        //     description,
        //     colorScheme: "danger",
        //     duration: 3000
        // });
    }
}