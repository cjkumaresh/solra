import { config } from "../config";
import { option, PCR, Signal } from "./model";
import { process } from "./core";

export const solluda = function (updateFrequencyinMS: number, cookie) {
  const pcrs: PCR[] = [];

  function getOptionChainData() {
    const options: RequestInit = {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: [["User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"], ["Host", "https://www.nseindia.com"],
      ["Cookie",cookie]]
    };
    const request = new Request(config.url, options);

    fetch(request).then((response) => { 
      // console.log(response);
       return response.json() })
    .then((response: any) => {
      process(response.filtered, pcrs);
    });
  }

  setInterval(() => {
    getOptionChainData();

  }, updateFrequencyinMS);
};
