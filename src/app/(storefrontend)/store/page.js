import Link from "next/link";

export default function StorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to Vesha
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Your premium fashion destination
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-secondary/50 rounded-lg p-6 hover:bg-secondary/70 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Women&apos;s Collection</h3>
          <p className="text-muted-foreground mb-4">Discover the latest trends in women&apos;s fashion</p>
          <div className="h-32 bg-muted rounded-md"></div>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-6 hover:bg-secondary/70 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Men&apos;s Collection</h3>
          <p className="text-muted-foreground mb-4">Stylish and comfortable men&apos;s wear</p>
          <div className="h-32 bg-muted rounded-md"></div>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-6 hover:bg-secondary/70 transition-colors">
          <h3 className="text-xl font-semibold mb-2">Kids Collection</h3>
          <p className="text-muted-foreground mb-4">Fun and vibrant clothing for kids</p>
          <div className="h-32 bg-muted rounded-md"></div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-muted rounded-md mb-3"></div>
              <h4 className="font-medium mb-1">Product {item}</h4>
              <p className="text-sm text-muted-foreground mb-2">Stylish item</p>
              <p className="font-semibold text-primary">₹{999 + item * 200}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center bg-primary/5 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Start Shopping Today</h2>
        <p className="text-muted-foreground mb-6">
          Explore our complete collection and find your perfect style
        </p>
        <div className="space-x-4">
          <Link href="/category/women" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Shop Women
          </Link>
          <Link href="/category/men" className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary/80 transition-colors">
            Shop Men
          </Link>
        </div>
      </div>
    </div>
  );
}
