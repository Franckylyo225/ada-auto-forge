import type { ComponentType } from 'react'
import { template as adaReservation } from './ada-reservation'
import { template as adaContact } from './ada-contact'
import { template as ipbRendezVous } from './ipb-rendez-vous'
import { template as ipbContact } from './ipb-contact'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 */
export const TEMPLATES: Record<string, TemplateEntry> = {
  'ada-reservation': adaReservation,
  'ada-contact': adaContact,
  'ipb-rendez-vous': ipbRendezVous,
  'ipb-contact': ipbContact,
}
