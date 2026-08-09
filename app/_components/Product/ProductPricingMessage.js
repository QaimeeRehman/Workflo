import Link from "next/link";
function ProductPricingMessage({ productId }) {
  return (
    <div className="rounded-xl bg-amber-50 p-6">
      <h2 className="font-semibold text-amber-800">Pricing not configured</h2>

      <p className="mt-1 text-sm text-amber-700">
        This product has been created, but its pricing has not been configured
        yet.
      </p>

      <Link
        href={`/products/${productId}/edit`}
        className="mt-4 inline-block rounded-lg bg-primary-500 px-4 py-2 text-white"
      >
        Add Pricing
      </Link>
    </div>
  );
}

export default ProductPricingMessage;
