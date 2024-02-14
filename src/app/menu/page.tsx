import Pagination from "@/components/share/Pagination";
import prisma from "@/lib/database";

import MenuItemOnFront from "./MenuItemOnFront";
import SectionHeader from "@/components/share/SectionHeader";

type Props = {
  searchParams?: { query?: string; page?: string };
};

const MenuPage = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  const [menuItems, totalCount, categories] = await Promise.all([
    prisma.menuItem.findMany({
      orderBy: {
        categoryName: "desc",
      },
      include: {
        category: true,
      },
      take: limit,
      skip: skip,
    }),
    prisma.menuItem.count(),
    prisma.category.findMany({ orderBy: { name: "desc" } }),
  ]);

  const totalPages = Math.ceil(Number(totalCount) / limit);
  console.log("menuItems.length", menuItems.length);
  return (
    <div className="flex flex-col justify-center items-centerv">
      <div className="flex flex-col justify-center items-center ">
        {categories.length > 0 &&
          categories.map((c: any) => (
            <div className="" key={c.id}>
              <div className="text-center">
                <SectionHeader mainHeader={c.name} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 mb-12">
                {menuItems
                  .filter((item: any) => item.category.name === c.name)
                  .map((item: any) => (
                    <MenuItemOnFront key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default MenuPage;
