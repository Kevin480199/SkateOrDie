export default function ProductModalContent({ product }) {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg overflow-hidden">
      
      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        
        {/* Category */}
        <p className="text-xs tracking-widest text-zinc-400 uppercase">
          {product.category}
        </p>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-zinc-300 leading-relaxed">
          {product.description}
        </p>

        {/* Actions */}
        <div className="pt-2">
          <button
                className="
                    inline-flex items-center justify-center
                    bg-red-600 text-white
                    px-6 py-2
                    text-sm font-semibold uppercase tracking-wide
                    rounded
                    transition-all duration-200 ease-out
                    hover:bg-red-500
                    hover:scale-105
                    hover:shadow-lg
                    active:scale-95
                    "
                >
                Lägg i kundvagn
            </button>
        </div>

      </div>
    </div>
  );
}
