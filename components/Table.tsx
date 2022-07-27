import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import React from "react";

interface Props {
  products: Product[];
  selectedPlan: Product;
}

const Table = ({ products, selectedPlan }: Props) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="table-row">
          <td className="table-data-title">Monthly price</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table-data-row ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
            >
              ₹ {product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>
        <tr className="table-row">
          <td className="table-data-title">Video Quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table-data-row ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="table-row">
          <td className="table-data-title">Watch on your laptop and TV</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table-data-row ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.watchLTV === "true" ? (
                <CheckIcon className="inline-block h-8 w-8" />
              ) : (
                <XIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
        <tr className="table-row">
          <td className="table-data-title">Watch on your phone and tablet</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table-data-row ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.watchPT === "true" ? (
                <CheckIcon className="inline-block h-8 w-8" />
              ) : (
                <XIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
        <tr className="table-row">
          <td className="table-data-title">
            Screens you can watch on at the same time
          </td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table-data-row ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.screens}
            </td>
          ))}
        </tr>
        <tr className="table-row">
          <td className="table-data-title">Watch on your phone and tablet</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table-data-row ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.unlimited === "true" ? (
                <CheckIcon className="inline-block h-8 w-8" />
              ) : (
                <XIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
        <tr className="table-row">
          <td className="table-data-title">Cancel anytime</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`table-data-row ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.cancel === "true" ? (
                <CheckIcon className="inline-block h-8 w-8" />
              ) : (
                <XIcon className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
