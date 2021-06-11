import axios from 'axios';
import { ErrorCode } from '../constants';
import { Logger } from '../helpers';

export const HttpRequestHandler = {
  /**
   * Make a GET request to an endpoint
   *
   * @returns Promise<any>
   */
  async makeGetCall(endpoint: string, parameters?: any): Promise<any> {
    try {
      const response = await axios.get(endpoint, {
        params: parameters,
      });
      return response;
    } catch (error) {
      Logger.Error(error);
      throw {
        code: ErrorCode.SERVER_ERROR,
        data: 'Error making request to endpoint',
      };
    }
  },
  /**
   * Make a POST request to an endpoint
   *
   * @returns Promise<any>
   */
  async makePostCall(endpoint: string, data: { [x: string]: any }): Promise<any> {
    try {
      const response = await axios.post(endpoint, data);
      return response;
    } catch (error) {
      Logger.Error(error);
      throw {
        code: ErrorCode.SERVER_ERROR,
        data: 'Error making request to endpoint',
      };
    }
  },
};
