import { analyse } from "./analyse";
import { option } from "./model";
import { roundOff } from "./util";

export function process(response, pcrs) {
  const CE: option = {
    volume: response.CE.totVol,
    openInterest: response.CE.totOI,
    type: "call",
  };
  const PE: option = {
    volume: response.PE.totVol,
    openInterest: response.PE.totOI,
    type: "put",
  };
  const PCR = roundOff(PE.openInterest / CE.openInterest);

  console.table([CE, PE, PCR]);
  const pcr = { put: PE, call: CE, ratio: PCR };
  if (pcrs.length > 0) {
    const previousPcr = pcrs[pcrs.length - 1];
    if (pcr.ratio === previousPcr.ratio) {
      return;
    }
  }
  pcrs.push(pcr);
  compare(pcrs);
}

export function compare(pcrs) {
  const currentPCRIndex = pcrs.length - 1;
  const currentPCR = pcrs[currentPCRIndex];
  const previousPCR = pcrs[currentPCRIndex - 1];
  const previousPCRMinusOne = pcrs[currentPCRIndex - 1];
  const previousPCRMinusTwo = pcrs[currentPCRIndex - 2];

  if (previousPCR?.ratio) {
    analyse(currentPCR.ratio, previousPCR.ratio, "strong", pcrs);
    analyse(currentPCR.ratio, previousPCRMinusOne.ratio, "strong", pcrs);
    analyse(
      currentPCR.ratio,
      previousPCRMinusTwo.ratio,
      "slightly strong",
      pcrs
    );
  }
}
