import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConstants } from "./app-constants";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  apiURL = AppConstants.apiUrl;

  async postRequest(url: any, body: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + url, body).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  async patchRequest(url: any, body: any) {
    // console.log(body);
    return new Promise((resolve, reject) => {
      this.http.patch(this.apiURL + url, body).subscribe(
        (res) => {
          // console.log(res);
          resolve(res);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }

  public async getRequest(url: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }

  public async deleteRequest(url: any, body: any) {
    return new Promise((resolve, reject) => {
      this.http.request("delete", this.apiURL + url, { body: body }).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          resolve(err);
        }
      );
    });
  }
}
