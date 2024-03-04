import { Toast } from "native-base";

export default class UIService {
    static showErrorToast(description: string, title?: string) {
        Toast.show({
            title,
            description,
            colorScheme: "danger",
            duration: 3000
        });
    }
}