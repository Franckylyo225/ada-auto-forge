import React from 'react'
import { Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'
import { Field, Shell, styles } from './_shared'

interface Props {
  reference?: string
  vehicleType?: string
  usage?: string
  startDate?: string
  durationDays?: number | string
  estimatedKm?: number | string
  outsideCI?: boolean
  lastName?: string
  firstName?: string
  birthDate?: string
  address?: string
  phone?: string
  email?: string
  profession?: string
  licenseNumber?: string
  licenseCategory?: string
  licenseIssuedAt?: string
  licenseIssuedPlace?: string
  observations?: string
}

const Email = (p: Props) => {
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ') || '—'
  return (
    <Shell
      brand="ADA"
      tag="Nouvelle réservation"
      title={`Nouvelle demande de réservation${p.reference ? ` · ${p.reference}` : ''}`}
      preview={`Réservation ${p.vehicleType ?? ''} — ${fullName}`}
    >
      <Section style={styles.panel}>
        <Text style={styles.sectionTitle}>Client</Text>
        <Field label="Nom complet" value={fullName} />
        <Field label="Téléphone" value={p.phone} />
        <Field label="Email" value={p.email} />
        <Field label="Adresse" value={p.address} />
        <Field label="Date de naissance" value={p.birthDate} />
        <Field label="Profession" value={p.profession} />
      </Section>

      <Section style={styles.panel}>
        <Text style={styles.sectionTitle}>Véhicule & mission</Text>
        <Field label="Type de véhicule" value={p.vehicleType} />
        <Field label="Usage" value={p.usage} />
        <Field label="Date de début" value={p.startDate} />
        <Field label="Durée (jours)" value={p.durationDays} />
        <Field label="Kilométrage estimé" value={p.estimatedKm} />
        <Field label="Sortie du territoire" value={p.outsideCI ? 'Oui' : 'Non'} />
      </Section>

      <Section style={styles.panel}>
        <Text style={styles.sectionTitle}>Permis de conduire</Text>
        <Field label="N° permis" value={p.licenseNumber} />
        <Field label="Catégorie" value={p.licenseCategory} />
        <Field label="Date de délivrance" value={p.licenseIssuedAt} />
        <Field label="Lieu de délivrance" value={p.licenseIssuedPlace} />
      </Section>

      {p.observations ? (
        <Section style={styles.panel}>
          <Text style={styles.sectionTitle}>Observations</Text>
          <Text style={styles.paragraph}>{p.observations}</Text>
        </Section>
      ) : null}
    </Shell>
  )
}

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `[ADA] Nouvelle réservation${d?.reference ? ` ${d.reference}` : ''} — ${d?.firstName ?? ''} ${d?.lastName ?? ''}`.trim(),
  displayName: 'ADA — Réservation véhicule',
  previewData: {
    reference: 'ADA-2026-0001',
    vehicleType: 'SUV / 4x4',
    usage: 'Professionnel',
    startDate: '2026-07-20',
    durationDays: 7,
    estimatedKm: 1200,
    outsideCI: false,
    firstName: 'Jean',
    lastName: 'Koffi',
    birthDate: '1988-05-14',
    address: 'Cocody, Riviera 3, Abidjan',
    phone: '+225 07 00 11 22 33',
    email: 'jean.koffi@example.com',
    profession: 'Consultant',
    licenseNumber: 'CI-123456',
    licenseCategory: 'B',
    licenseIssuedAt: '2010-06-01',
    licenseIssuedPlace: 'Abidjan',
    observations: 'Livraison souhaitée à l’aéroport FHB.',
  },
} satisfies TemplateEntry
