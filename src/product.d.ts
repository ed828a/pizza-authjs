type MenuItemType = {
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

type AddonType = {
  name: string;
  price: string;
};
