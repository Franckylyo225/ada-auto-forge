import React from 'react'
import { Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { Field, Shell, styles } from './_shared'

interface Props {
  name?: string
  email?: string
  phone?: string
  vehicle?: string
  plate?: string
  service?: string
  damage?: string
  location?: string
  preferredDate?: string
  preferredSlot?: string
  message?: string
}

const Email = (p: Props) => (
  <Shell
    brand="IPB"
    tag="Nouvelle prise de rendez-vous"
    title="Nouveau rendez-vous — Ivoire Pare-Brise"
    preview={`RDV IPB — ${p.name ?? ''}${p.service ? ' · ' + p.service : ''}`}
  >
    <Section style={styles.panel}>
      <Text style={styles.sectionTitle}>Client</Text>
      <Field label="Nom" value={p.name} />
      <Field label="Email" value={p.email} />
      <Field label="Téléphone" value={p.phone} />
    </Section>

    <Section style={styles.panel}>
      <Text style={styles.sectionTitle}>Véhicule & prestation</Text>
      <Field label="Véhicule (marque / modèle)" value={p.vehicle} />
      <Field label="Immatriculation" value={p.plate} />
      <Field label="Prestation souhaitée" value={p.service} />
      <Field label="Type de dommage" value={p.damage} />
      <Field label="Lieu d’intervention" value={p.location} />
      <Field label="Date souhaitée" value={p.preferredDate} />
      <Field label="Créneau" value={p.preferredSlot} />
    </Section>

    {p.message ? (
      <Section style={styles.panel}>
        <Text style={styles.sectionTitle}>Message</Text>
        <Text style={styles.paragraph}>{p.message}</Text>
      </Section>
    ) : null}
  </Shell>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `[IPB] Nouveau RDV — ${d?.name ?? ''}${d?.service ? ' · ' + d.service : ''}`.trim(),
  displayName: 'IPB — Rendez-vous',
  previewData: {
    name: 'Marc Dosso',
    email: 'marc.dosso@example.com',
    phone: '+225 07 88 99 00 11',
    vehicle: 'Toyota Corolla 2018',
    plate: '1234 AB 01',
    service: 'Remplacement pare-brise',
    damage: 'Fissure > 20cm côté conducteur',
    location: 'Atelier Angré',
    preferredDate: '2026-07-18',
    preferredSlot: 'Matin (8h–12h)',
    message: 'Disponible dès jeudi, merci de me confirmer un créneau.',
  },
} satisfies TemplateEntry
