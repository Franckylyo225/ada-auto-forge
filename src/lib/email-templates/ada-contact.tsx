import React from 'react'
import { Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { Field, Shell, styles } from './_shared'

interface Props {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

const Email = (p: Props) => (
  <Shell
    brand="ADA"
    tag="Nouveau message contact"
    title="Nouveau message via le formulaire ADA"
    preview={`Contact ADA — ${p.name ?? ''}${p.subject ? ' · ' + p.subject : ''}`}
  >
    <Section style={styles.panel}>
      <Text style={styles.sectionTitle}>Expéditeur</Text>
      <Field label="Nom" value={p.name} />
      <Field label="Email" value={p.email} />
      <Field label="Téléphone" value={p.phone} />
      <Field label="Objet" value={p.subject} />
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
    `[ADA] Contact — ${d?.subject ?? d?.name ?? 'Nouveau message'}`,
  displayName: 'ADA — Contact',
  previewData: {
    name: 'Awa Traoré',
    email: 'awa.traore@example.com',
    phone: '+225 05 44 55 66 77',
    subject: 'Location de véhicule',
    message:
      'Bonjour, je souhaite un devis pour la location d’un SUV du 1er au 10 août à Abidjan. Merci.',
  },
} satisfies TemplateEntry
