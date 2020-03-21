export const homeUrl = '/';
export const registerUrl = '/register';
export const manageUrl = '/manage';

export const getOwnerOverviewUrl = (restaurantSlug?: string) =>
  restaurantSlug ? `/owner/${restaurantSlug}` : '/owner/:restaurant';

export const getReceptionUrl = (restaurantSlug?: string) =>
  restaurantSlug ? `/reception/${restaurantSlug}` : '/reception/:restaurant';
