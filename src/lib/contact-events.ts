/** Stable names shared by the website, GA4 and the private contact log. */
export const contactEvents = {
  callback: 'callback_erledigt_team',
  phone: 'direkt_anrufen_erledigt_team',
  whatsapp: 'whatsapp_erledigt_team',
  email: 'email_erledigt_team',
  form: 'formular_erfolg_erledigt_team',
} as const;
export type ContactEvent = (typeof contactEvents)[keyof typeof contactEvents];
