import { Centrifuge } from "centrifuge";
import {
  CENTRIFUGE_WS,
  CENTRIFUGE_PUBLIC_TOKEN,
  DEFAULT_PAIR,
} from "../services/constants";

export function useCentrifuge() {
  const centrifuge = new Centrifuge(CENTRIFUGE_WS, {
    token: CENTRIFUGE_PUBLIC_TOKEN,
  });

  const orderBookSubscription = centrifuge.newSubscription(DEFAULT_PAIR);

  return { centrifuge, orderBookSubscription };
}
