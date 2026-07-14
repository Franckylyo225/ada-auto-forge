import React from 'react'
import { Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { Field, Shell, styles } from './_shared'

interface Props {
  name?: string
  email?: string
  phone?: string
  vehicle?: string
  message?: string
}

const Email = (p: Props) => (
  <Shell
    brand="IPB"
    tag="Nouveau message contact"
    title="Nouveau message via le formulaire IPB"
    preview={`Contact IPB — ${p.name ?? ''}`}
  >
    <Section style={styles.panel}>
      <Text style={styles.sectionTitle}>Expéditeur</Text>
      <Field label="Nom" value={p.name} />
      <Field label="Email" value={p.email} />
      <Field label="Téléphone" value={p.phone} />
      <Field label="Véhicule concerné" value={p.vehicle} />
    </Section>

    <Section style={styles.panel}>
      <Text style={styles.sectionTitle}>Message</Text>
      <Text style={styles.paragraph}>{p.message ?? '—'}</Text>
    </Section>
  </Shell>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `[IPB] Contact — ${d?.name ?? 'Nouveau message'}`,
  displayName: 'IPB — Contact',
  previewData: {
    name: 'Fatou N’Guessan',
    email: 'fatou.n@example.com',
    phone: '+225 01 22 33 44 55',
    vehicle: 'Hyundai Tucson 2020',
    message:
      'Bonjour, impact au centre du pare-brise suite à un caillou. Possible de passer samedi matin ?',
  },
} satisfies TemplateEntry
