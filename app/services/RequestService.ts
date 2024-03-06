import axios from "axios";
import { apiConfig } from "../config/apiConfig";
import { Toast } from 'native-base';
import UIService from "./UIService";
interface Response {
  error_type: "verification" | "authentication" | "authorization" | "validation" | "server" | boolean;
  messages?: any;
  data?: any
}
export default class RequestService {

  static async get(uri: string, params?: any) {
    try {
      const response = await axios.get(apiConfig.apiURL + uri, { params });
      return response.data;
    } catch (error) {
      console.error("Error in GET request:", error);
      UIService.showErrorToast('An error occurred while processing your request')
      throw error;
    }
  }
  private static resolve_validation(error_type: string | boolean, messages: Object, formikForm: any) {
    if (!error_type) {
      return;
    }

    // validation errors
    if (error_type == "validation") {
      var error_messages = {};
      for (let key in messages) {
        error_messages = {
          ...error_messages,
          [key]: Array.isArray(messages[key]) ? messages[key].join("\n") : messages[key],
        };
      }
      formikForm.setErrors(error_messages);
    }
    // authentication errors
    if (error_type == "authentication" || error_type == "verification") {
      for (let key in messages) {
        UIService.showErrorToast(Array.isArray(messages[key]) ? messages[key].join("\n") : messages[key])
      }
    }
  }
  private static resolve_codes(code: number) {
    switch (code) {
      case 500:
        UIService.showErrorToast('An error occurred while processing your request')
        break;
      case 400:
        break;
      case 200:
        break;
      default:
        break;
    }

  }

  static async post(uri: string, data: any, token?: string, formikForm?: any): Promise<Response> {
    var response: Response, headers = {};
    try {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      const request = await axios.post<Response>(apiConfig.apiURL + uri, data, {
        headers
      });
      response = request.data

    } catch (error) {

      response = error.response.data
      console.error("Error in POST request:", response);
      this.resolve_codes(error.response.status)

    } finally {

      this.resolve_validation(response.error_type, response.messages, formikForm)

      return response
    }
  }

  static async put(uri: string, data: any) {
    try {
      const response = await axios.put(apiConfig.apiURL + uri, data);
      return response.data;
    } catch (error) {
      console.error("Error in PUT request:", error);
      Toast.show({
        title: 'An error occurred while processing your request',
        bgColor: "red.500",
        duration: 3000
      });
      throw error;
    }
  }

  static async delete(uri: string) {
    try {
      const response = await axios.delete(apiConfig.apiURL + uri);
      return response.data;
    } catch (error) {
      console.error("Error in DELETE request:", error);
      UIService.showErrorToast('An error occurred while processing your request')
      throw error;
    }
  }
}
