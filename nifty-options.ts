import { config } from "./config";
import { option, PCR, Signal } from "./model";
import { process } from "./core";

export const solluda = function (updateFrequencyinMS: number) {
  const pcrs: PCR[] = [];

  function getOptionChainData() {
    const options: RequestInit = {
      method: "GET",
      mode: "cors",
      cache: "default",
    };
    const request = new Request(config.url, options);

    fetch(request).then((response: any) => {
      console.log(response);
      process(response.filtered, pcrs);
    });
  }

  setInterval(() => {
    getOptionChainData();
  }, updateFrequencyinMS);
};
