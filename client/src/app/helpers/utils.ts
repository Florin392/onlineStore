export function currencyFormat(amount: number) {
  return "$" + (amount / 100).toFixed(2);
}

export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function getImageUrl(pictureUrl?: string) {
  if (!import.meta.env.VITE_ASSETS_URL) {
    console.error("VITE_ASSETS_URL is not defined");
    return ""; // or a default URL if appropriate
  }
  if (!pictureUrl) {
    console.error("pictureUrl is undefined or null");
    return "/images/placeholder.png"; // Use a default image URL
  }
  return `${import.meta.env.VITE_ASSETS_URL}${pictureUrl.replace(
    "/images/products",
    ""
  )}`;
}
