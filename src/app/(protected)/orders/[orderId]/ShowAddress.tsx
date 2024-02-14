import LabelInput from "@/components/share/LabelInput";
import React from "react";

type Props = {
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  country: string;
};

const ShowAddress = ({
  phone,
  streetAddress,
  city,
  postcode,
  country,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 mb-4  text-left">
      <h3 className="text-2xl">Devliver Address </h3>
      <LabelInput
        label="Phone number"
        id="phone"
        name="phone"
        type="tel"
        placeholder="Phone number"
        defaultValue={phone || ""}
        readOnly
      />

      <LabelInput
        label="Street address"
        id="streetAddress"
        name="streetAddress"
        type="text"
        placeholder="Street address"
        defaultValue={streetAddress || ""}
        readOnly
      />

      <div className="flex gap-x-4 ">
        <LabelInput
          label="City"
          id="city"
          name="city"
          type="text"
          placeholder="City"
          defaultValue={city || ""}
          readOnly
        />
        <LabelInput
          label="Postcode"
          id="postcode"
          name="postcode"
          type="text"
          placeholder="Post code"
          defaultValue={postcode || ""}
          readOnly
        />
      </div>
      <LabelInput
        label="Country"
        id="country"
        name="country"
        type="text"
        placeholder="Country"
        defaultValue={country || ""}
        readOnly
      />
    </div>
  );
};

export default ShowAddress;
