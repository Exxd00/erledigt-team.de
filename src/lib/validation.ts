import { z } from 'zod';
export const serviceSlugs = [
  'unterhaltsreinigung',
  'buero-praxisreinigung',
  'grund-sonderreinigung',
  'treppenhausreinigung',
  'glas-fensterreinigung',
  'maschinen-anlagenreinigung',
  'hallen-gewerbereinigung',
  'baustellenreinigung',
  'polster-teppichreinigung',
  'dach-oberflaechenreinigung',
  'pv-anlagen-reinigung',
  'beratung',
] as const;
const text = (max: number) => z.string().trim().max(max);
const campaign = text(80).regex(/^[\p{L}\p{N}_ .-]*$/u);
const calendarDate = z
  .string()
  .refine(
    (v) =>
      v === '' ||
      (/^\d{4}-\d{2}-\d{2}$/.test(v) &&
        Number.isFinite(Date.parse(v)) &&
        new Date(v).toISOString().slice(0, 10) === v),
    'Bitte ein gültiges Datum eingeben.',
  );
export const safePath = z
  .string()
  .max(250)
  .regex(/^\/[a-z0-9/-]*$/);
export const leadSchema = z
  .object({
    id: z.string().uuid(),
    service: z.enum(serviceSlugs),
    city: text(100).min(2),
    postal_code: z.string().regex(/^\d{5}$/),
    property_type: z.enum([
      'Privathaushalt',
      'Gewerbe / Büro',
      'Praxis',
      'Hausverwaltung',
      'Industrie / Halle',
      'Sonstiges',
    ]),
    scope: text(160),
    frequency: z.enum(['Einmalig', 'Regelmäßig', 'Noch offen']),
    preferred_date: calendarDate,
    name: text(120).min(2),
    company: text(160),
    email: z.union([z.literal(''), z.string().trim().email().max(254)]),
    phone: z
      .string()
      .trim()
      .max(35)
      .refine(
        (v) => !v || (/^[+\d\s()/.-]{7,35}$/.test(v) && (v.match(/\d/g) || []).length >= 7),
        'Bitte eine gültige Telefonnummer eingeben.',
      ),
    contact_method: z.enum(['E-Mail', 'Telefon']),
    message: text(3000),
    privacy: z.literal(true),
    website: z.string().max(200),
    started_at: z.number().finite(),
    analytics_consent: z.boolean(),
    source: campaign.optional(),
    medium: campaign.optional(),
    campaign: campaign.optional(),
    landing_page: safePath.optional(),
  })
  .superRefine((v, c) => {
    if (v.contact_method === 'E-Mail' && !v.email)
      c.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['email'],
        message: 'Bitte E-Mail-Adresse angeben.',
      });
    if (v.contact_method === 'Telefon' && !v.phone)
      c.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: 'Bitte Telefonnummer angeben.',
      });
  });
export type LeadInput = z.infer<typeof leadSchema>;
export const eventNames = [
  'page_view',
  'cta_click',
  'phone_click',
  'email_click',
  'service_select',
  'city_select',
  'filter_used',
  'form_start',
  'form_step',
  'form_submit_success',
  'form_submit_error',
  'interaction',
  'scroll_depth',
  'consent_update',
] as const;
export const eventSchema = z.object({
  id: z.string().uuid(),
  name: z.enum(eventNames),
  path: safePath,
  session_id: z.string().uuid(),
  device: z.enum(['mobile', 'tablet', 'desktop']),
  consent: z.literal('analytics'),
  service: z.enum(serviceSlugs).optional(),
  city: z
    .string()
    .regex(/^[a-z-]{1,80}$/)
    .optional(),
  position: text(60)
    .regex(/^[a-z_]*$/)
    .optional(),
  step: text(80)
    .regex(/^[\p{L}\p{N}_ &-]*$/u)
    .optional(),
  lead_id: z.string().uuid().optional(),
  source: campaign.optional(),
  medium: campaign.optional(),
  campaign: campaign.optional(),
  landing_page: safePath.optional(),
});
export function neutralizeSheetCell(value: unknown) {
  const s = String(value ?? '');
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
}
