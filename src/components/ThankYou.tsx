'use client';
import { useEffect } from 'react';
import { contactEvents } from '@/lib/contact-events';
import { trackConfirmedRequest } from '@/lib/tracking';
export function ThankYou({
  id,
  eventId,
  service,
  city,
}: {
  id: string;
  eventId: string;
  service: string;
  city?: string;
}) {
  useEffect(() => {
    trackConfirmedRequest(contactEvents.form, id, eventId, {
      service,
      city,
      position: 'thank_you',
    });
  }, [id, eventId, service, city]);
  return null;
}
