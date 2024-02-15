import { OrderStatus } from "@prisma/client";

type TMenuItem = {
  id?: string | null;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string;
  sizes: AddonType[];
  extraIngredients: AddonType[];
  bestSeller: boolean;
};

type TAddon = {
  name: string;
  price: string;
};

type CartContextType = {
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
  addToCart: (
    item: any,
    subPrice: string,
    size?: AddonType | null,
    extras?: AddonType[]
  ) => void;
  removeOneItemOutOfCart: (indexToRemove: number) => void;
  clearCart: () => void;
};

type TCartItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: string;
  bestSeller: boolean;
  product: any;
  subPrice: string;
  size: AddonType | null;
  extras: AddonType[] | null;
};

type OrderType = {
  purchaserEmail: string;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
  purchasedItems: CartItemType[];
  status: OrderStatus;
};
