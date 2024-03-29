import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import useAuth from "../hooks/useAuth";
import useSubs from "../hooks/useSubs";
import { redirectToBilling } from "../lib/stripe";

const Membership = () => {
  const { user } = useAuth();
  const subscription = useSubs(user);
  const [isBillingLoading, setBillingLoading] = useState(false);

  const manageSubscription = () => {
    if (subscription) {
      setBillingLoading(true);
      redirectToBilling();
    }
  };
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
      <div className="space-y-2 py-4">
        <h4 className="text-lg text-[gray]">Membership & Billing</h4>
        <button
          disabled={isBillingLoading || !subscription}
          className="h-12 w-3/5 whitespace-nowrap rounded-md bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
          onClick={manageSubscription}
        >
          {isBillingLoading ? (
            <div className="flex items-center justify-center">
              <TailSpin color="#e50914" height={30} width={30} />
            </div>
          ) : (
            "Cancel Membership"
          )}
        </button>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-[gray]">Password: ********</p>
          </div>
          <div>
            <p className="membership-link">Change Email</p>
            <p className="membership-link">Change Password</p>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
          <div>
            <p>
              {subscription?.cancel_at_period_end
                ? "Your membership will end on "
                : "Your next billing date is "}
              {subscription?.current_period_end}
            </p>
          </div>
          <div className="flex flex-col justify-end md:text-right">
            <p className="membership-link">Manage payment info</p>
            <p className="membership-link">Add backup payment method</p>
            <p className="membership-link">Billing Details</p>
            <p className="membership-link">Change billing day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
