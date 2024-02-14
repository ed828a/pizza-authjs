"use client";

import LabelInput from "@/components/share/LabelInput";
import { ProfileType } from "@/next-auth";

type Props = {
  userState: Partial<ProfileType>;
  setUserState: React.Dispatch<React.SetStateAction<Partial<ProfileType>>>;
};

const AddressInputs = ({ userState, setUserState }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log("userState", userState);
  // console.log("setUserState", setUserState);

  return (
    <div className="flex flex-col gap-4 mb-4  ">
      <LabelInput
        label="Phone number"
        id="phone"
        name="phone"
        type="tel"
        placeholder="Phone number"
        value={userState?.phone}
        handleChange={handleChange}
      />
      <LabelInput
        label="Street address"
        id="streetAddress"
        name="streetAddress"
        type="text"
        placeholder="Street address"
        value={userState?.streetAddress}
        handleChange={handleChange}
      />

      <div className="flex gap-x-4 ">
        <LabelInput
          label="City"
          id="city"
          name="city"
          type="text"
          placeholder="City"
          value={userState?.city}
          handleChange={handleChange}
        />
        <LabelInput
          label="Postcode"
          id="postcode"
          name="postcode"
          type="text"
          placeholder="Post code"
          value={userState?.postcode}
          handleChange={handleChange}
        />
      </div>
      <LabelInput
        label="Country"
        id="country"
        name="country"
        type="text"
        placeholder="Country"
        value={userState?.country}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AddressInputs;
