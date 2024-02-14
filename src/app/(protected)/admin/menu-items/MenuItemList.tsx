import Image from "next/image";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";

type Props = {
  menuItems: any[];
  page: string | undefined;
};

const MenuItemList = ({ menuItems, page }: Props) => {
  // console.log("menuItems", menuItems);
  let query = "";
  try {
    if (page && Number(page)) {
      query = `?page=${page}`;
    }
    console.log("query", query);
  } catch (error: any) {
    console.log("MenuItemList error", error.message);
  }

  return (
    <div className="min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[980px] pt-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {menuItems.length > 0
          ? menuItems.map((item: any) => (
              <Link
                key={item.id}
                href={`/admin/menu-items/edit/${item.id}${query}`}
                className="bg-gray-200 p-4 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-gray-500 transition-all"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt="item image"
                    width={100}
                    height={100}
                    className="rounded-lg mx-auto w-full h-auto"
                    priority
                  />
                </div>
                <div className="text-center dark:text-gray-800">
                  {item.name}
                </div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default MenuItemList;
