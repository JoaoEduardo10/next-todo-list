export const frontEndRedirect = (redirectTo?: string) => {
  if (typeof window == 'undefined') return null;

  const newPath = redirectTo || encodeURI(window.location.pathname);

  window.location.href = `${process.env.NEXT_PUBLIC_URL_SITE_LOGIN}?redirect=${newPath}`;
};
