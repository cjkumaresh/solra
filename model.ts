export interface option {
  volume: number;
  openInterest: number;
  type: "call" | "put";
}

export interface PCR {
  put: option;
  call: option;
  ratio: number;
}

export enum Signal {
  bullish = "bullish",
  bearish = "bearish",
  choppy = "choppy",
  bullish_reversal = "bullish_reversal",
  bearish_reversal = "bearish_reversal",
}

export enum Strength {
  "very-strong",
  "strong",
  "slightly strong",
  "average",
}
