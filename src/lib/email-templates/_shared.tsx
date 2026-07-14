import React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr } from '@react-email/components'

export const colors = {
  black: '#0A0A0A',
  yellow: '#FFE800',
  yellowSoft: '#FFF7B0',
  border: '#E5E7EB',
  muted: '#6B7280',
  bg: '#ffffff',
  panel: '#F9FAFB',
}

export const styles = {
  main: { backgroundColor: colors.bg, fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: 0 },
  container: { maxWidth: 600, margin: '0 auto', padding: '24px' },
  header: { backgroundColor: colors.black, padding: '28px 32px', borderRadius: 16 },
  brandTag: { color: colors.yellow, fontSize: 11, letterSpacing: 2, fontWeight: 800, textTransform: 'uppercase' as const, margin: 0 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 900, margin: '8px 0 0', lineHeight: 1.15 },
  panel: { backgroundColor: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 16, padding: '20px 24px', marginTop: 16 },
  sectionTitle: { fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: colors.muted, fontWeight: 800, margin: '0 0 12px' },
  label: { fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' as const, color: colors.muted, fontWeight: 700, margin: 0 },
  value: { fontSize: 15, color: colors.black, fontWeight: 600, margin: '2px 0 12px' },
  paragraph: { fontSize: 14, color: '#111', lineHeight: 1.6, margin: '0 0 12px' },
  footer: { textAlign: 'center' as const, color: colors.muted, fontSize: 12, marginTop: 24 },
  hr: { borderColor: colors.border, margin: '16px 0' },
}

export function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </>
  )
}

export function Shell({
  brand,
  tag,
  title,
  preview,
  children,
  footerNote,
}: {
  brand: 'ADA' | 'IPB'
  tag: string
  title: string
  preview: string
  children: React.ReactNode
  footerNote?: string
}) {
  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.brandTag}>
              {brand === 'ADA' ? 'ADA Côte d’Ivoire' : 'Ivoire Pare-Brise'} · {tag}
            </Text>
            <Heading style={styles.headerTitle}>{title}</Heading>
          </Section>
          {children}
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            {footerNote ?? 'Cet email a été généré automatiquement suite à une soumission sur ada-africa.com.'}
            <br />
            ADA Côte d’Ivoire — Treichville, Boulevard VGE · +225 07 00 28 29 30
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
