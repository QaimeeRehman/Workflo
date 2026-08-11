import StockItem from "./StockItem";

function StockItems({ products, packaging, items, updateItem, removeItem }) {
  return (
    <section className="border-b border-slate-200">
      <div className="space-y-4 p-5">
        {items.map((item, index) => (
          <StockItem
            key={index}
            itemIndex={index}
            item={item}
            products={products}
            packaging={packaging}
            updateItem={updateItem}
            onRemove={items.length > 1 ? () => removeItem(index) : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default StockItems;
