import React from "react";
import LinkButton from "./LinkButton";

type Props = {
  admin: boolean;
};

const ProtectedNav = ({ admin }: Props) => {
  return (
    <div className="hidden mt-8 mb-16 max-w-4xl mx-auto sm:block">
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-4">
        <LinkButton href="/profile">Profile</LinkButton>
        {admin && (
          <>
            <LinkButton href="/admin/categories">Categories</LinkButton>
            <LinkButton href="/admin/menu-items">Menu Items</LinkButton>
            <LinkButton href="/admin/users">Users</LinkButton>
          </>
        )}
        <LinkButton href="/orders">Orders</LinkButton>
      </div>
    </div>
  );
};

export default ProtectedNav;
