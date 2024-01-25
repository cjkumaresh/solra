import { Signal } from "./model";
// const notifier = require("node-notifier");
// import notifier from 'node-notifier';
export function analyse(
  current: number,
  previous: number,
  strength: "very strong" | "strong" | "slightly strong",
  pcrs
) {
  const diff = current - previous;

  if (diff === 0) {
    // no change
    console.log("no change");
    return diff;
  }

  if (diff > 0) {
    // increasing
    console.log("increasing");
  }

  if (diff < 0) {
    // decreasing
    console.log("decreasing");
  }

  broadcast(signal(current, pcrs), strength);
}

function signal(currentRatio, pcrs): Signal {
  const initialRatio = pcrs[0]?.ratio;

  if (currentRatio > 0.9) {
    // bullish

    if (currentRatio > initialRatio) {
      return Signal.bullish;
    } else if (currentRatio == initialRatio) {
      return Signal.choppy;
    } else {
      return Signal.bearish_reversal;
    }
  } else {
    // bearish

    if (currentRatio < initialRatio) {
      return Signal.bearish;
    } else if (currentRatio == initialRatio) {
      return Signal.choppy;
    } else {
      return Signal.bullish_reversal;
    }
  }
}

function broadcast(signal: Signal, strength) {
  if (signal !== Signal.choppy) {
    console.info({
      title: "Change alert",
      message: strength + ' ' +signal
    })
  } else {
    console.log(strength + " " + signal);
  }
}
