import prisma from "@/lib/database";
import MenuItemDetails from "../../new-item/MenuItemDetails";
import ShowAllMenuItemsLink from "../../ShowAllMenuItemsLink";
import { MenuItemType } from "@/product";

type Props = {
  params: { id: string };
};

const EditMenuItemPage = async ({ params }: Props) => {
  const [categories, menuItem] = await Promise.all([
    prisma.category.findMany(),
    prisma.menuItem.findUnique({ where: { id: params.id } }),
  ]);

  console.log("MenuItemDetailsPage cateogries", categories);
  console.log("MenuItemDetailsPage menu", menuItem);

  const originalMenuItem: MenuItemType = {
    id: menuItem?.id,
    name: menuItem?.name!,
    image: menuItem?.image!,
    description: menuItem?.description!,
    category: menuItem?.categoryName!,
    basePrice: menuItem?.basePrice!,
    sizes: [...menuItem?.sizes!],
    extraIngredients: [...menuItem?.extraIngredients!],
    bestSeller: menuItem?.bestSeller!,
  };
  return (
    <div className=" flex justify-center items-center pt-16">
      <div className="flex flex-col gap-8">
        <ShowAllMenuItemsLink />
        <MenuItemDetails
          categories={categories}
          originalMenuItem={originalMenuItem}
        />
      </div>
    </div>
  );
};

export default EditMenuItemPage;
