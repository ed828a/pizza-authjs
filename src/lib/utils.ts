import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Inter, Merriweather, Dancing_Script } from "next/font/google";
import { TAddon, TMenuItem } from "@/product";

export const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
});

export const inter = Inter({ subsets: ["latin"] });

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["italic", "normal"],
});

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const postcodeRegex = new RegExp(/^[0-9]{4}$/);

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function html({
  url,
  host,
  email,
  label,
}: {
  url: string;
  host: string;
  email: string;
  label: string;
}) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#ff0000";
  const buttonBorderColor = "#ff0000";
  const buttonTextColor = "#ffffff";

  return `
  <body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${escapedHost}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        ${label} as <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">${label}</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

function arraysEqual(arr1: TAddon[], arr2: TAddon[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];

    for (const key in obj1) {
      // @ts-expect-error
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  return true;
}

export const disableSubmitMenuItems = (
  a: TMenuItem | null,
  b: TMenuItem | null
) => {
  if (a === null) return true;
  if (b === null) {
    const enable =
      a.name.length > 0 &&
      a.image.length > 0 &&
      a.description.length > 0 &&
      a.category.length > 0 &&
      a.basePrice.length > 0;

    console.log("disableSubmitMenuItems return ", !enable);
    return !enable;
  }

  let enable =
    a.name !== b.name ||
    a.image !== b.image ||
    a.description !== b.description ||
    a.category !== b.category ||
    a.basePrice !== b.basePrice ||
    a.sizes.length !== b.sizes.length ||
    a.extraIngredients.length !== b.extraIngredients.length ||
    a.bestSeller !== b.bestSeller;

  console.log("disableSubmitMenuItems return ", !enable);
  let disabled =
    arraysEqual(a.sizes, b.sizes) &&
    arraysEqual(a.extraIngredients, b.extraIngredients);

  console.log(
    "arraysEqual(a.sizes, b.sizes) return",
    arraysEqual(a.sizes, b.sizes)
  );
  console.log(
    " arraysEqual(a.extraIngredients, b.extraIngredients) return",
    arraysEqual(a.extraIngredients, b.extraIngredients)
  );

  return disabled && !enable;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString).toLocaleDateString();
  const time = new Date(dateString).toLocaleTimeString();

  return { date, time };
};
