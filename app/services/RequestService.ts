import axios from "axios";
import { apiConfig } from "../config/apiConfig";
import UIService from "./UIService";
interface Response {
  error_type: "verification" | "authentication" | "authorization" | "validation" | "server" | boolean;
  messages?: any;
  data?: any
}
export default class RequestService {


  private static resolve_validation(error_type: string | boolean, messages: Object, formikForm: any = null) {
    if (!error_type) {
      return;
    }

    // validation errors
    if (error_type === "validation") {
      if (formikForm === null) {
        for (let key in messages) {
          UIService.showErrorToast(Array.isArray(messages[key]) ? messages[key].join("\n") : messages[key])
        }
      } else {
        var error_messages = {};
        for (let key in messages) {
          error_messages = {
            ...error_messages,
            [key]: Array.isArray(messages[key]) ? messages[key].join("\n") : messages[key],
          };
        }
        formikForm.setErrors(error_messages);
      }
    }
    // authentication errors
    if (error_type === "authentication" || error_type === "verification") {
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
      default: apiConfig.apiURL
        apiConfig.apiURL
        break;
    }

  }
  static async get(uri: string, token: string = "", params: any = {}): Promise<Response> {
    console.log('====================================');
    console.log("URL:", apiConfig.apiURL + uri);
    console.log('====================================');
    var response: Response, headers = {};
    try {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      const request = await axios.get<Response>(apiConfig.apiURL + uri, { params, headers });
      response = request.data

    } catch (error) {

      response = error.response.data
      console.error("Error in GET request:", response);
      this.resolve_codes(error.response.status)

    } finally {
      return response
    }
  }
  static async post(uri: string, data: any, token?: string, formikForm?: any): Promise<Response> {
    console.log('====================================');
    console.log("URL:", apiConfig.apiURL + uri);
    console.log('====================================');
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


  static async put(uri: string, data: any, token?: string, formikForm?: any): Promise<Response> {
    var response: Response, headers = {};
    try {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      const request = await axios.put<Response>(apiConfig.apiURL + uri, data, {
        headers
      });
      response = request.data

    } catch (error) {

      response = error.response.data
      console.error("Error in PUT request:", response);
      this.resolve_codes(error.response.status)

    } finally {

      this.resolve_validation(response.error_type, response.messages, formikForm)

      return response
    }
  }

  static async patch(uri: string, data: any, token?: string, formikForm?: any): Promise<Response> {
    var response: Response, headers = {};
    try {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      const request = await axios.patch<Response>(apiConfig.apiURL + uri, data, {
        headers
      });
      response = request.data

    } catch (error) {

      response = error.response.data
      console.error("Error in PATCH request:", response);
      this.resolve_codes(error.response.status)

    } finally {

      this.resolve_validation(response.error_type, response.messages, formikForm)

      return response
    }
  }

  static async delete(uri: string, token: string = "", params: any = {}): Promise<Response> {
    var response: Response, headers = {};
    try {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      const request = await axios.delete<Response>(apiConfig.apiURL + uri, { params, headers });
      response = request.data

    } catch (error) {

      response = error.response.data
      console.error("Error in Delete request:", response);
      this.resolve_codes(error.response.status)

    } finally {

      this.resolve_validation(response.error_type, response.messages)

      return response
    }
  }
}
