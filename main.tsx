import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Package, Users, Star, Filter, X, ShoppingCart, TrendingUp, Truck, Shield, Phone, Mail, Building2, User, Eye, Lock, Tag, Menu } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
  sellerPhone: string;
  sellerEmail: string;
  isNew: boolean;
  condition: string;
  location: string;
  province: string;
  image: string;
  category: string;
  distance: number;
  rating: number;
  isAffiliate: boolean;
  affiliateCommission: number;
  available: boolean;
  discountCode?: string;
  discountPercentage?: number;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'seller' | 'affiliate' | 'buyer';
  province: string;
  rating: number;
  products: Product[];
  avatar: string;
  bio: string;
  memberSince: string;
}

interface EyeTrackingFigure {
  x: number;
  y: number;
  isWatching: boolean;
  isPasswordFocused: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const provinces = [
  'Todas as Províncias',
  'Luanda',
  'Benguela',
  'Huíla',
  'Namibe',
  'Cunene',
  'Huambo',
  'Bie',
  'Moxico',
  'Cuanza Norte',
  'Cuanza Sul',
  'Uíge',
  'Zaire',
  'Malanje',
  'Lunda Norte',
  'Lunda Sul',
  'Cuando Cubango'
];

const categories = [
  'Todos',
  'Electrônicos',
  'Veículos',
  'Imóveis',
  'Serviços',
  'Moda',
  'Casa & Jardim',
  'Esportes',
  'Negócios'
];

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: 950000,
    seller: 'TecnoShop Angola',
    sellerPhone: '+244 923 456 789',
    sellerEmail: 'vendas@tecnoshop.ao',
    isNew: true,
    condition: 'Novo',
    location: 'Luanda, Belas',
    province: 'Luanda',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Electrônicos',
    distance: 2.5,
    rating: 4.8,
    isAffiliate: false,
    affiliateCommission: 0,
    available: true,
    discountCode: 'TECNO10',
    discountPercentage: 10
  },
  {
    id: 2,
    name: 'Toyota Corolla 2022',
    price: 18500000,
    seller: 'AutoMarket Angola',
    sellerPhone: '+244 934 567 890',
    sellerEmail: 'info@automarket.ao',
    isNew: false,
    condition: 'Semi-novo',
    location: 'Benguela, Lobito',
    province: 'Benguela',
    image: 'https://images.unsplash.com/photo-1540606744452-2b19e66e6406?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Veículos',
    distance: 450,
    rating: 4.5,
    isAffiliate: true,
    affiliateCommission: 5,
    available: true
  },
  {
    id: 3,
    name: 'MacBook Pro M3 16GB',
    price: 1800000,
    seller: 'Apple Store Luanda',
    sellerPhone: '+244 912 345 678',
    sellerEmail: 'store@apple.ao',
    isNew: true,
    condition: 'Novo',
    location: 'Luanda, Talatona',
    province: 'Luanda',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Electrônicos',
    distance: 5,
    rating: 4.9,
    isAffiliate: false,
    affiliateCommission: 0,
    available: true
  },
  {
    id: 4,
    name: 'Apartamento T3 - Miramar',
    price: 45000000,
    seller: 'Imobiliária Kamba',
    sellerPhone: '+244 945 678 901',
    sellerEmail: 'contacto@kamba.ao',
    isNew: true,
    condition: 'Novo',
    location: 'Luanda, Miramar',
    province: 'Luanda',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Imóveis',
    distance: 8,
    rating: 4.7,
    isAffiliate: true,
    affiliateCommission: 3,
    available: true
  },
  {
    id: 5,
    name: 'Sapatilhas Nike Air Max',
    price: 85000,
    seller: 'SportStore',
    sellerPhone: '+244 956 789 012',
    sellerEmail: 'sportstore@gmail.com',
    isNew: false,
    condition: 'Usado - Bom estado',
    location: 'Huíla, Lubango',
    province: 'Huíla',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Esportes',
    distance: 720,
    rating: 4.3,
    isAffiliate: false,
    affiliateCommission: 0,
    available: true
  },
  {
    id: 6,
    name: 'Serviço de Web Design',
    price: 350000,
    seller: 'Digital Agency',
    sellerPhone: '+244 967 890 123',
    sellerEmail: 'info@digitalagency.ao',
    isNew: true,
    condition: 'Serviço Profissional',
    location: 'Luanda, Viana',
    province: 'Luanda',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Serviços',
    distance: 15,
    rating: 4.6,
    isAffiliate: true,
    affiliateCommission: 10,
    available: true
  },
  {
    id: 7,
    name: 'Geladeira Samsung Inverter',
    price: 420000,
    seller: 'ElectroMundo',
    sellerPhone: '+244 978 901 234',
    sellerEmail: 'vendas@electromundo.ao',
    isNew: true,
    condition: 'Novo com garantia',
    location: 'Cuanza Sul, Sumbe',
    province: 'Cuanza Sul',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Casa & Jardim',
    distance: 350,
    rating: 4.4,
    isAffiliate: false,
    affiliateCommission: 0,
    available: true
  },
  {
    id: 8,
    name: 'Vestido de Festa',
    price: 65000,
    seller: 'Maria Fashion',
    sellerPhone: '+244 989 012 345',
    sellerEmail: 'maria@fashion.ao',
    isNew: false,
    condition: 'Usado uma vez',
    location: 'Luanda, Maianga',
    province: 'Luanda',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=300&h=300',
    category: 'Moda',
    distance: 12,
    rating: 4.8,
    isAffiliate: true,
    affiliateCommission: 8,
    available: true
  }
];

const calculateMarketFee = (price: number): number => {
  return price * 0.04;
};

const calculateTransportCost = (distance: number): number => {
  const baseCost = 2000;
  const perKm = distance > 50 ? 300 : 150;
  return baseCost + (distance * perKm);
};

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Todas as Províncias');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [userLocation] = useState('Luanda');
  
  // Eye tracking figure state
  const [eyePosition, setEyePosition] = useState({ x: 0.5, y: 0.5 });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userType, setUserType] = useState<'visitor' | 'seller' | 'affiliate' | 'buyer'>('visitor');
  const [showLogin, setShowLogin] = useState(false);
  const figureRef = useRef<HTMLDivElement>(null);
  
  // Eye tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (figureRef.current && !isPasswordFocused) {
        const rect = figureRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate angle and distance from center
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = Math.min(0.5, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 200);
        
        setEyePosition({
          x: 0.5 + Math.cos(angle) * distance,
          y: 0.5 + Math.sin(angle) * distance
        });
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (figureRef.current && !isPasswordFocused && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = figureRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
        const distance = Math.min(0.5, Math.hypot(touch.clientX - centerX, touch.clientY - centerY) / 200);
        
        setEyePosition({
          x: 0.5 + Math.cos(angle) * distance,
          y: 0.5 + Math.sin(angle) * distance
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPasswordFocused]);
  
  // Sample user profiles
  const userProfiles: Record<string, UserProfile> = {
    seller: {
      id: 1,
      name: "TecnoShop Angola",
      email: "vendas@tecnoshop.ao",
      phone: "+244 923 456 789",
      userType: "seller",
      province: "Luanda",
      rating: 4.8,
      products: mockProducts.filter(p => p.seller === "TecnoShop Angola"),
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100",
      bio: "Especializada em eletrônicos e gadgets de última geração. Garantia e qualidade em todos os produtos!",
      memberSince: "Janeiro de 2022"
    },
    affiliate: {
      id: 2,
      name: "Carlos Silva",
      email: "carlos@kamba.ao",
      phone: "+244 934 567 890",
      userType: "affiliate",
      province: "Benguela",
      rating: 4.5,
      products: mockProducts.filter(p => p.isAffiliate),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      bio: "Afiliado top com mais de 500 vendas realizadas. Encontre os melhores produtos através das minhas recomendações!",
      memberSince: "Março de 2023"
    },
    buyer: {
      id: 3,
      name: "Maria Santos",
      email: "maria@exemplo.com",
      phone: "+244 945 678 901",
      userType: "buyer",
      province: "Luanda",
      rating: 4.9,
      products: [],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      bio: "Cliente fiel da plataforma. Comprou mais de 100 produtos e sempre satisfeita!",
      memberSince: "Setembro de 2022"
    }
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === 'Todas as Províncias' || product.province === selectedProvince;
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesNew = !showNewOnly || product.isNew;
    return matchesSearch && matchesProvince && matchesCategory && matchesNew;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartFee = calculateMarketFee(cartTotal);
  const cartTransport = cart.reduce((sum, item) => sum + calculateTransportCost(item.distance), 0);
  const cartGrandTotal = cartTotal + cartFee + cartTransport;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">KambaMarket</h1>
                <p className="text-xs text-gray-500">Compre & Venda Local</p>
              </div>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos, serviços ou vendedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Entrar</span>
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Nav */}
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4 overflow-x-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:border-emerald-500 transition-colors whitespace-nowrap"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>

            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
              >
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border">
              <Building2 className="w-4 h-4 text-emerald-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border cursor-pointer hover:bg-emerald-50 transition-colors">
              <input
                type="checkbox"
                checked={showNewOnly}
                onChange={(e) => setShowNewOnly(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
              />
              <span className="text-sm">Apenas novos</span>
            </label>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-bold">15.420</p>
                <p className="text-emerald-100">Produtos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-bold">8.530</p>
                <p className="text-emerald-100">Vendedores</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-bold">4%</p>
                <p className="text-emerald-100">Taxa de Mercado</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-bold">4.8</p>
                <p className="text-emerald-100">Avaliação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredProducts.length} Produtos Encontrados
            </h2>
            <p className="text-gray-500">
              Sua localização: {userLocation}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                      Novo
                    </span>
                  )}
                  {product.isAffiliate && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                      Afiliado {product.affiliateCommission}%
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-semibold">{product.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{product.location}</span>
                  <span className="text-emerald-600 font-medium">
                    {product.distance}km
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500 mb-3">{product.seller}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-emerald-600">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs text-gray-400">
                      + Taxa 4%: {formatCurrency(calculateMarketFee(product.price))}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {selectedProduct.isNew && (
                  <span className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-full">
                    {selectedProduct.condition}
                  </span>
                )}
                {!selectedProduct.isNew && (
                  <span className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-full">
                    {selectedProduct.condition}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedProduct.location} ({selectedProduct.distance}km de você)</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-amber-700">{selectedProduct.rating}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Preço do produto</span>
                  <span className="text-xl font-bold text-gray-800">{formatCurrency(selectedProduct.price)}</span>
                </div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-500">Taxa de mercado (4%)</span>
                  <span className="text-emerald-600">+ {formatCurrency(calculateMarketFee(selectedProduct.price))}</span>
                </div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-500">Custo de transporte estimado</span>
                  <span className={selectedProduct.distance > 50 ? 'text-orange-600' : 'text-emerald-600'}>
                    + {formatCurrency(calculateTransportCost(selectedProduct.distance))}
                  </span>
                </div>
                {selectedProduct.distance > 50 && (
                  <p className="text-xs text-orange-600 bg-orange-50 px-3 py-1 rounded-lg mt-2">
                    ⚠️ Produto de outra província - custo de transporte elevado
                  </p>
                )}
                
                {selectedProduct.discountCode && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Código de Desconto Disponível</span>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      Use o código <strong className="font-mono bg-blue-100 px-2 py-1 rounded">{selectedProduct.discountCode}</strong> para ganhar {selectedProduct.discountPercentage}% de desconto!
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600">Preço com desconto:</span>
                      <span className="font-bold text-blue-800 text-lg">
                        {formatCurrency(selectedProduct.price * (1 - (selectedProduct.discountPercentage || 0) / 100))}
                      </span>
                    </div>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Total estimado</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      {formatCurrency(
                        selectedProduct.price +
                        calculateMarketFee(selectedProduct.price) +
                        calculateTransportCost(selectedProduct.distance)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {selectedProduct.isAffiliate && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">Produto de Afiliado</span>
                  </div>
                  <p className="text-sm text-amber-700">
                    Este produto é vendido por um afiliado que ganha {selectedProduct.affiliateCommission}% de comissão sobre a venda.
                  </p>
                </div>
              )}

              <div className="bg-white border rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Informações do Vendedor</h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedProduct.seller}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{selectedProduct.rating} • {selectedProduct.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`tel:${selectedProduct.sellerPhone}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Ligar
                  </a>
                  <a
                    href={`mailto:${selectedProduct.sellerEmail}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Seu Carrinho</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-emerald-600 font-bold">{formatCurrency(item.price)}</p>
                          {item.discountCode && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {item.discountCode} ({item.discountPercentage}% off)
                            </span>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">Qtd: {item.quantity}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 bg-gray-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span className="font-semibold">{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxa de mercado (4%)</span>
                      <span className="font-semibold text-emerald-600">{formatCurrency(cartFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transporte total</span>
                      <span className="font-semibold text-emerald-600">{formatCurrency(cartTransport)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-bold text-gray-800">Total</span>
                      <span className="text-xl font-bold text-emerald-600">{formatCurrency(cartGrandTotal)}</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                    Finalizar Compra
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLogin(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Eye Tracking Figure */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
              <div
                ref={figureRef}
                className="w-32 h-32 mx-auto relative"
              >
                {/* Geometric Figure (Octagon with eyes) */}
                <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl transform rotate-45 shadow-lg relative overflow-hidden">
                  {/* Face Content (counter-rotated) */}
                  <div className="absolute inset-0 transform -rotate-45 flex flex-col items-center justify-center">
                    {/* Eyes Container */}
                    <div className="flex gap-8 mb-4">
                      {/* Left Eye */}
                      <div className="w-10 h-10 bg-white rounded-full relative overflow-hidden shadow-inner">
                        <div
                          className="absolute w-5 h-5 bg-gray-900 rounded-full transition-all duration-150"
                          style={{
                            left: `${eyePosition.x * 100 - 25}%`,
                            top: `${eyePosition.y * 100 - 25}%`
                          }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                        </div>
                      </div>
                      {/* Right Eye */}
                      <div className="w-10 h-10 bg-white rounded-full relative overflow-hidden shadow-inner">
                        <div
                          className="absolute w-5 h-5 bg-gray-900 rounded-full transition-all duration-150"
                          style={{
                            left: `${eyePosition.x * 100 - 25}%`,
                            top: `${eyePosition.y * 100 - 25}%`
                          }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                        </div>
                      </div>
                    </div>
                    {/* Mouth */}
                    <div className="w-8 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                {/* Password covering effect */}
                {isPasswordFocused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-100 bg-opacity-90 rounded-2xl transform rotate-45">
                    <div className="transform -rotate-45 text-center">
                      <Eye className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                      <span className="text-xs text-emerald-700 font-medium">Protegendo sua senha</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-center text-gray-600 mt-4 font-medium">Olá! Vamos começar?</p>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Acesse sua Conta</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-600">Lembrar-me</span>
                  </label>
                  <a href="#" className="text-sm text-emerald-600 hover:underline">Esqueceu a senha?</a>
                </div>
                
                <button className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
                  Entrar
                </button>
              </div>
              
              <div className="mt-8">
                <p className="text-center text-gray-600 mb-4">Ou entre como:</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setUserType('seller');
                      setShowLogin(false);
                      setShowUserProfile(true);
                    }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all flex flex-col items-center"
                  >
                    <Building2 className="w-8 h-8 text-emerald-600 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Vendedor</span>
                    <span className="text-xs text-gray-400">(Obrigatório)</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserType('affiliate');
                      setShowLogin(false);
                      setShowUserProfile(true);
                    }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all flex flex-col items-center"
                  >
                    <Users className="w-8 h-8 text-amber-600 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Afiliado</span>
                    <span className="text-xs text-gray-400">(Obrigatório)</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserType('buyer');
                      setShowLogin(false);
                    }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all flex flex-col items-center"
                  >
                    <User className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-xs font-medium text-gray-700">Comprador</span>
                    <span className="text-xs text-gray-400">(Opcional)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserProfile && userProfiles[userType] && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowUserProfile(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-center">
              <img
                src={userProfiles[userType].avatar}
                alt={userProfiles[userType].name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
              />
              <h2 className="text-2xl font-bold text-white mt-4">{userProfiles[userType].name}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                userType === 'seller' ? 'bg-emerald-100 text-emerald-800' :
                userType === 'affiliate' ? 'bg-amber-100 text-amber-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {userType === 'seller' ? 'Vendedor Profissional' :
                 userType === 'affiliate' ? 'Afiliado Premium' :
                 'Comprador VIP'}
              </span>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-lg font-bold text-gray-800">{userProfiles[userType].rating}</span>
                <span className="text-gray-500">(128 avaliações)</span>
              </div>
              
              <p className="text-gray-600 text-center mb-6">{userProfiles[userType].bio}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{userProfiles[userType].email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{userProfiles[userType].phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{userProfiles[userType].province}, Angola</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Membro desde {userProfiles[userType].memberSince}</span>
                </div>
              </div>
              
              {userType !== 'buyer' && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {userType === 'seller' ? 'Produtos Anunciados' : 'Produtos em Afiliação'} ({userProfiles[userType].products.length})
                  </h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {userProfiles[userType].products.slice(0, 5).map(product => (
                      <img
                        key={product.id}
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        title={product.name}
                      />
                    ))}
                    {userProfiles[userType].products.length > 5 && (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500 font-semibold">+{userProfiles[userType].products.length - 5}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Editar Perfil
                </button>
                <button
                  onClick={() => setShowUserProfile(false)}
                  className="flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Ver Meus Anúncios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Encontre o Produto</h3>
              <p className="text-gray-600">
                Busque por produtos ou serviços na sua região. Filtre por categoria, província e condição do item.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Contate o Vendedor</h3>
              <p className="text-gray-600">
                Entre em contato diretamente com o vendedor por telefone ou email para negociar detalhes e entrega.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Finalize com Segurança</h3>
              <p className="text-gray-600">
                A plataforma cobra apenas 4% de taxa de mercado. Afiliados ganham comissão por vendas realizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">KambaMarket</span>
              </div>
              <p className="text-gray-400">
                A plataforma que une compradores e vendedores em Angola.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Compradores</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Buscar Produtos</li>
                <li className="hover:text-white cursor-pointer transition-colors">Vendedores Proximos</li>
                <li className="hover:text-white cursor-pointer transition-colors">Calculadora de Frete</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Vendedores</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Anunciar Produto</li>
                <li className="hover:text-white cursor-pointer transition-colors">Programa de Afiliados</li>
                <li className="hover:text-white cursor-pointer transition-colors">Taxas e Comissões</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +244 923 000 000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  ajuda@kambamarket.ao
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2024 KambaMarket. Todos os direitos reservados.</p>
            <p className="text-sm mt-2">Taxa de mercado: 4% sobre cada venda • Comissões de afiliado variam por produto</p>
          </div>
        </div>
      </footer>
    </div>
  );
}