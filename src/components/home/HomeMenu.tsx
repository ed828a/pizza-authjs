import Image from "next/image";
import SectionHeader from "../share/SectionHeader";
import MenuItemOnFront from "@/app/menu/MenuItemOnFront";
import { MenuItemType } from "@/product";

type Props = {};

const HomeMenu = async (props: Props) => {
  const bestSellers = await prisma?.menuItem.findMany({
    where: { bestSeller: true },
  });

  //   console.log("bestSellers", bestSellers);

  if (!bestSellers) {
    return <div>No Best Sellers</div>;
  }

  return (
    <div className="">
      <div className="text-center relative left-0 right-0 w-full justify-start  ">
        <div className="absolute -left-4 -top-[100px] text-left -z-10">
          <Image
            src="/images/sallad_right.png"
            width={107}
            height={195}
            alt="sallad"
          />
        </div>
        <div className="absolute -top-[100px] -right-4 -z-10">
          <Image
            src="/images/sallad_left.png"
            width={107}
            height={195}
            alt="sallad"
          />
        </div>
      </div>
      <SectionHeader subHeader="check out" mainHeader="Our Best Sellers" />
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 mt-16">
        {bestSellers.length > 0 &&
          bestSellers.map((item: Partial<MenuItemType>) => (
            <MenuItemOnFront key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default HomeMenu;
