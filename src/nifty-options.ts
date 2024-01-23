import { config } from "../config";
import { option, PCR, Signal } from "./model";
import { process } from "./core";

export const solluda = function (updateFrequencyinMS: number) {
  const pcrs: PCR[] = [];

  function getOptionChainData() {
    const options: RequestInit = {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: [["User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"], ["Host", "https://www.nseindia.com"], ["Cookie", '_ga=GA1.1.1966928375.1705433694; nsit=LYDevXzY-cPj7h80nM4Fw9Vm; AKA_A2=A; defaultLang=en; _ga_QJZ4447QD3=GS1.1.1705952325.2.0.1705952325.0.0.0; ak_bmsc=D4705B2F5CB55D5F3945569767D890AF~000000000000000000000000000000~YAAQBNcLF+Tu7BONAQAAm7CuMhZImIO6PsReN9LkwF88O1UUXTpYgukqpciNhPcSN0Br92T2IC3tysqkKfcIdo80tuuI8A6mw+EwDKrZ/ny0WYijQiQh9gR6F7QFxjW7M+3p8MTfv1CdMQIcD4Va4yG7CXESuBW4cqcLQWFJrWlZ6vxmfG6k3oLXedchoqSYFxDvjnyS0mKvYIoW0/xgh9QJ7sDuxj8W0tj4Gp8c6vM530oAwctxAKdnJ6xIGzqCCnnKmLKT6OODjlw5jfK+1iSNTFoyXtlZWzhO28/5rsgXwlDkh9u8hMHYBokh5PFNTOxOkwhGM/K+ZaXkx83jAJqUtiX+5jQ+bd/TE0bL143Gy2xM8Iwdptepr/Wu+lyQgwjoHwuoeD1I+MChHgJrU/adcpRq91nF6j2FjK16hWM+75DlPWLoebIvxO26gXwnGu4EPYVljecsTWmNH/2tJyomWZJU0tZt7omYjWf4BnyTB907EbjWv78a+L2L662Foys=; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcwNTk1MjM1MSwiZXhwIjoxNzA1OTU5NTUxfQ.PJ78_qGQ91kwkFvfSXP4gBx039jSqVGQP1gw4sjYApI; RT="z=1&dm=nseindia.com&si=50043490-2bae-45d8-9cd6-d6bcad3264fc&ss=lrpbyu2r&sl=1&se=8c&tt=lr&bcn=%2F%2F684d0d48.akstat.io%2F"; _ga_87M7PJ3R97=GS1.1.1705952325.3.1.1705952352.0.0.0; bm_sv=74FE8EF481C0C549937ECF4663B59D73~YAAQBNcLF5rv7BONAQAA3RivMhbXT3KmY3aMrHPy13exfCXGec7EL2ja4K/1OFDik/ywMzh1ZOW7g54nUbXy+IgQgT/6B33EzIPgq3fuJFcPWfvnL72pdoaUvRgnw0ethHw9PbDKWdmW96EGi3C/i86uRSoROGpd04TY+DlYXZJGKCTpX7Ro5wml6oymAm5J+XViA5/tQ5HsPjn14kee/mgksZXydXNuxpp6mnwhyDKOKZwx0xDuou33xjXyevQKXes=~1']]
    };
    const request = new Request(config.url, options);

    fetch(request).then((response) => response.json())
    .then((response: any) => {
      process(response.filtered, pcrs);
    });
  }

  setInterval(() => {
    getOptionChainData();

  }, updateFrequencyinMS);
};
