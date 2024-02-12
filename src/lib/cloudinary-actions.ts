"use server";

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/database";
import { auth } from "./auth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function create(formData: FormData) {
  console.log("call create now");
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer(); // Buffer version file for uploading
  const buffer = new Uint8Array(arrayBuffer);
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ["actions-upload-sneakers"],
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  console.log("result", result);

  // await saveImageLinkToMongoDB(result.secure_url);

  revalidatePath("/profile");
}

export const uploadImageToCloudinary = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer(); // Buffer version file for uploading
  const buffer = new Uint8Array(arrayBuffer);
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ["pizza-shop-user"],
          public_id: `pizza-online/profile/${file.name.split(".")[0]}`,
          transformation: {
            width: 300,
            height: 400,
            gravity: "faces:center",
            crop: "thumb",
            quality: "auto",
          },
        },
        function (error, result) {
          // console.log("result", result);
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  console.log("result", result);

  return { image: result.secure_url };
};

export async function saveImageLinkToMongoDB(imageLink: string) {
  const update = { image: imageLink };
  console.log("update", update);

  const session = await auth();
  console.log("session", session);

  if (!session) {
    return { error: "unauthorized", image: imageLink };
  }

  const user = await prisma.user.update({
    where: { email: session.user.email! },
    data: { image: imageLink },
  });

  console.log("user", user);

  return user;
}

export async function saveImageLinkByEmailToMongoDB(
  imageLink: string,
  email?: string
) {
  if (!email) {
    console.log("email is undefined, updating failed");
    return {
      isError: true,
      message: "email is undefined, updating failed",
      imageLink,
    };
  }

  const session = await auth();
  // console.log("session", session);

  if (!session) {
    return { error: "unauthorized", image: imageLink };
  }

  const update = { image: imageLink };
  // console.log("update", update);

  const user = await prisma.user.update({
    where: { email: email },
    data: { image: imageLink },
  });

  console.log("saveImageLinkByEmailToMongoDB user", user);

  return user;
}

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }

//   await dbConnect();

//   const user = await User.findOne({ email: userEmail });
//   if (!user) {
//     return false;
//   }
//   return user.admin;
// }

// export async function getAdmin() {
//   const session = await getServerSession(authOptions);

//   const userEmail = session?.user?.email;
//   if (!userEmail) return false;

//   await dbConnect();
//   const user = await User.findOne({ email: userEmail });
//   return !!user.admin;
// }
