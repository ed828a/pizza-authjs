"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useFormState } from "react-dom";
import Link from "next/link";
import { ProfileType } from "@/next-auth";
import { updateProfileAction } from "@/lib/routes-actions";
import { GoArrowLeft } from "react-icons/go";
import LabelInput from "@/components/share/LabelInput";
import LoadingButton from "@/components/share/LoadingButton";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UserRole } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  user?: Partial<ProfileType>;
  callbackUrl: string;
};

const ProfileForm = ({ user, callbackUrl }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const { data: session, status, update } = useSession();

  const [userData, setUserData] = useState({
    email: user?.email ?? "",
    userName: user?.name ?? "",
    userImage: user?.image ?? "",
    phone: user?.phone ?? "",
    streetAddress: user?.streetAddress ?? "",
    city: user?.city ?? "",
    postcode: user?.postcode ?? "",
    country: user?.country ?? "",
    role: user?.role ?? "USER",
    isTwoFactorEnabled: user?.isTwoFactorEnabled ?? false,
    isOAuth: user?.isOAuth,
  });

  const initialState = { message: "" };

  const updateProfileActionWithEmail = updateProfileAction.bind(
    null,
    callbackUrl,
    user?.email!
  );

  const [state, dispatch] = useFormState(
    updateProfileActionWithEmail,
    initialState
  );
  console.log("state", state);

  console.log("ProfileForm session", session);

  const enableSubmit =
    userData.email !== user?.email ||
    userData.userName !== user?.name ||
    userData.phone !== user?.phone ||
    userData.streetAddress !== user?.streetAddress ||
    userData.city !== user?.city ||
    userData.postcode !== user?.postcode ||
    userData.country !== user?.country ||
    userData.role !== user?.role ||
    userData.isTwoFactorEnabled !== user?.isTwoFactorEnabled;

  const empty =
    !userData.userName &&
    !userData.phone &&
    !userData.streetAddress &&
    !userData.city &&
    !userData.postcode &&
    !userData.country;

  console.log("enableSubmit", enableSubmit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("userData", userData);

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const updateSessionImage = async (image: string) => {
    if (
      session?.user.email &&
      user?.email &&
      session?.user.email === user?.email
    ) {
      console.log("userData.userImage", userData.userImage);
      const updatedSession = await update({ image: image });
      console.log("updatedSession", updatedSession);
      // router.refresh();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoadingImage(true);

    const files = e.target.files;
    console.log("files", files);
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      console.log("handleImageChange userData.email", userData.email);
      data.set("email", userData.email!);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: data,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        });

        if (response.ok) {
          const user = await response.json();
          console.log("handleImageChange server returned user", user);
          setUserData((prev) => ({ ...prev, userImage: user.image }));
          resolve(user.image);
        } else {
          reject({ message: "uploading image failed" });
        }
      });

      const result = await toast.promise(uploadPromise, {
        pending: "Uploading...",
        success: "Uploading completed.",
        error: "Uploading failed.",
      });

      console.log("handleImageChange result", result);
      if (pathname.startsWith("/profile")) {
        await updateSessionImage(result as string);
      }

      setLoadingImage(false);
    }
  };

  console.log("ProfileForm userData", userData);
  // console.log("ProfileForm user", user);
  // const sessionUser = session?.user;
  // console.log("ProfileForm sessionUser", sessionUser);

  return (
    <div className="w-full max-w-screen-md flex flex-col transition-all duration-500  ">
      <Link href={callbackUrl} className="self-end mr-8  h-4">
        <GoArrowLeft className="hover:text-red-500 hover:border-red-500 w-10 h-6 ml-auto border rounded-full hidden sm:block " />
      </Link>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center ">
        <div className="flex flex-col items-center gap-4 sm:mt-4 flex-grow relative">
          <Image
            src={
              userData.userImage ? userData.userImage : "/images/profile.jpg"
            }
            width={180}
            height={180}
            alt="avatar"
            className="rounded-lg mb-2 "
          />
          <label className="w-full max-w-[300px] px-4 ">
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              disabled={loadingImage}
            />
            <span
              className={cn(
                "block border border-gray-300  rounded-lg p-2 text-center text-gray-400  cursor-pointer ",
                {
                  "cursor-wait": loadingImage,
                  "hover:border-primary hover:text-primary dark:hover:text-primary-foreground dark:hover:border-primary-foreground":
                    !loadingImage,
                }
              )}
            >
              Edit
            </span>
          </label>
          {loadingImage && (
            <LoadingSpinner className="absolute top-2 w-full h-1/4 text-primary dark:text-primary-foreground animate-spin duration-700" />
          )}
        </div>
        <div className="flex justify-center items-center px-4">
          <form action={dispatch}>
            <div className="flex flex-col gap-4 sm:p-2">
              <LabelInput
                label="Full name"
                id="username"
                name="userName"
                type="text"
                value={userData.userName || ""}
                handleChange={handleChange}
                placeholder="First and last name"
              />
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 ">
                <LabelInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  disabled={true}
                  defaultValue={userData?.email}
                />
                <div className="">
                  <Label className="text-gray-400">Role</Label>
                  <Select
                    value={userData?.role}
                    name="role"
                    onValueChange={(e) => {
                      setUserData((prev) => ({
                        ...prev,
                        role: e as UserRole,
                      }));
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <LabelInput
                label=" Phone number"
                id="phone"
                name="phone"
                type="tel"
                value={userData.phone || ""}
                handleChange={handleChange}
                placeholder="Phone number"
              />

              <LabelInput
                label="Street address"
                id="streetAddress"
                name="streetAddress"
                type="text"
                value={userData.streetAddress || ""}
                handleChange={handleChange}
                placeholder="Street address"
              />

              <div className="flex flex-col sm:flex-row gap-4 ">
                <LabelInput
                  label="City"
                  id="city"
                  name="city"
                  type="text"
                  value={userData.city || ""}
                  handleChange={handleChange}
                  placeholder="City"
                />

                <LabelInput
                  label="Postcode"
                  id="postcode"
                  name="postcode"
                  type="text"
                  value={userData.postcode || ""}
                  handleChange={handleChange}
                  placeholder="Postcode"
                />

                <LabelInput
                  label="Country"
                  id="country"
                  name="country"
                  type="text"
                  value={userData.country || ""}
                  handleChange={handleChange}
                  placeholder="Country"
                />
              </div>
              <div className="">
                {user?.isOAuth === false ? (
                  <div className="flex justify-between items-center border rounded-lg p-2">
                    <div className="">
                      <Label htmlFor="airplane-mode">
                        Two Factor Authentication
                      </Label>
                      <p className="text-gray-500">
                        Enable two factor authentication for your account.
                      </p>
                    </div>
                    <Switch
                      id="airplane-mode"
                      name="isTwoFactorEnabled"
                      className="text-primary-foreground bg-primary-foreground"
                      checked={userData.isTwoFactorEnabled}
                      onCheckedChange={(check: boolean) =>
                        setUserData((prev) => ({
                          ...prev,
                          isTwoFactorEnabled: check,
                        }))
                      }
                    />
                  </div>
                ) : null}
              </div>

              <LoadingButton
                type="submit"
                disabled={!enableSubmit}
                isLoading={loadingProfile}
                className="mt-4 w-full"
                onClick={() => setLoadingProfile(true)}
              >
                Update
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
