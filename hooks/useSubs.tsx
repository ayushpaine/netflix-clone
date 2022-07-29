import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import payments from "../lib/stripe";

const useSubs = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (sub) => sub.status === "active" || sub.status === "trialing"
        )[0]
      );
    });
  }, []);

  return subscription;
};

export default useSubs;
