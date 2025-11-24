import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer'

// Corporate minimalist color scheme
const colors = {
  primary: '#1e293b',      // Slate 800
  secondary: '#64748b',    // Slate 500
  accent: '#10b981',       // Emerald 500
  text: '#334155',         // Slate 700
  lightText: '#94a3b8',    // Slate 400
  background: '#ffffff',
  border: '#e2e8f0'        // Slate 200
}

// Professional typography
const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: colors.background,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.text
  },
  header: {
    marginBottom: 30,
    borderBottom: `2 solid ${colors.accent}`,
    paddingBottom: 15
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 5
  },
  headline: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 8
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 5
  },
  contactItem: {
    fontSize: 9,
    color: colors.secondary
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 10,
    borderBottom: `1 solid ${colors.border}`,
    paddingBottom: 4
  },
  bio: {
    fontSize: 10,
    lineHeight: 1.5,
    color: colors.text,
    textAlign: 'justify'
  },
  itemContainer: {
    marginBottom: 12
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 2
  },
  itemSubtitle: {
    fontSize: 10,
    color: colors.secondary,
    marginBottom: 2
  },
  itemDate: {
    fontSize: 9,
    color: colors.lightText,
    marginBottom: 4
  },
  itemDescription: {
    fontSize: 9,
    color: colors.text,
    lineHeight: 1.4
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  skillTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    fontSize: 9,
    color: colors.text
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20
  },
  column: {
    flex: 1
  },
  link: {
    color: colors.accent,
    textDecoration: 'none'
  }
})

interface ResumeData {
  name: string | null
  headline: string | null
  bio: string | null
  email: string
  location: string | null
  website: string | null
  linkedin: string | null
  twitter: string | null
  expertise: string[]
  experience: any[] | null
  education: any[] | null
  skills: any[] | null
  certifications: any[] | null
  languages: any[] | null
}

export function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name || 'Professional Resume'}</Text>
          {data.headline && <Text style={styles.headline}>{data.headline}</Text>}

          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{data.email}</Text>
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
            {data.website && (
              <Link src={data.website} style={[styles.contactItem, styles.link]}>
                {data.website.replace(/^https?:\/\//, '')}
              </Link>
            )}
            {data.linkedin && (
              <Link src={data.linkedin} style={[styles.contactItem, styles.link]}>
                LinkedIn
              </Link>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {data.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.bio}>{data.bio}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp: any, index: number) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{exp.title}</Text>
                <Text style={styles.itemSubtitle}>
                  {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                </Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                  {exp.current && ' • Current'}
                </Text>
                {exp.description && (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu: any, index: number) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemTitle}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </Text>
                <Text style={styles.itemSubtitle}>{edu.school}</Text>
                <Text style={styles.itemDate}>
                  {edu.startYear} - {edu.endYear || 'Present'}
                  {edu.grade && ` • ${edu.grade}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills & Expertise */}
        {data.expertise && data.expertise.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Expertise</Text>
            <View style={styles.skillsContainer}>
              {data.expertise.map((skill: string, index: number) => (
                <Text key={index} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications & Languages */}
        {((data.certifications && data.certifications.length > 0) ||
          (data.languages && data.languages.length > 0)) && (
          <View style={styles.twoColumn}>
            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certifications.map((cert: any, index: number) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{cert.name}</Text>
                    <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
                    {cert.date && (
                      <Text style={styles.itemDate}>{cert.date}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <View style={styles.column}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {data.languages.map((lang: any, index: number) => (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{lang.name}</Text>
                    {lang.proficiency && (
                      <Text style={styles.itemSubtitle}>{lang.proficiency}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  )
}
