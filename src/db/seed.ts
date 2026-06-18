import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schemes } from './schema'

config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString)
const db = drizzle(client)

const SEED_SCHEMES = [
  {
    slug: 'kisan-samman-nidhi',
    title: 'Kisan Samman Nidhi',
    description: 'Income support to all landholding farmers families in the country.',
    category: 'Agriculture',
    targetGroup: 'Farmers',
    benefits: 'Rs. 6000 per year in three equal installments.',
    eligibility: 'All landholding farmers families, having cultivable land in their names.',
    applicationProcess: 'Apply online on pmkisan.gov.in or via CSC.',
    requiredDocuments: ['Aadhaar Card', 'Bank Account Details', 'Land Holding Documents'],
    officialUrl: 'https://pmkisan.gov.in',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    schemeType: 'Central Sector Scheme',
    occupationTags: ['farmer', 'agriculture'],
    stateTags: [],
    genderTags: [],
    educationTags: [],
    ageMin: 18,
    ageMax: null,
    incomeMin: null,
    incomeMax: null,
    isActive: true,
  },
  {
    slug: 'national-scholarship-scheme',
    title: 'National Means cum Merit Scholarship',
    description: 'Scholarships for meritorious students of economically weaker sections.',
    category: 'Education',
    targetGroup: 'Students',
    benefits: 'Rs. 12000 per annum (Rs. 1000 per month).',
    eligibility: 'Students studying in Class IX. Parental income should not exceed Rs. 3,50,000 per annum.',
    applicationProcess: 'Apply through National Scholarship Portal.',
    requiredDocuments: ['Income Certificate', 'Aadhaar Card', 'School ID', 'Bank Account Details'],
    officialUrl: 'https://scholarships.gov.in',
    ministry: 'Ministry of Education',
    schemeType: 'Centrally Sponsored Scheme',
    occupationTags: ['student'],
    stateTags: [],
    genderTags: [],
    educationTags: [],
    ageMin: 13,
    ageMax: 16,
    incomeMin: null,
    incomeMax: '350000',
    isActive: true,
  },
  {
    slug: 'doctor-rural-incentive-mp',
    title: 'Doctor Rural Incentive Scheme (MP)',
    description: 'Incentive for medical professionals to serve in rural areas of Madhya Pradesh.',
    category: 'Healthcare',
    targetGroup: 'Medical Professionals',
    benefits: 'Additional 20% to 30% of basic salary as incentive.',
    eligibility: 'Must be a registered medical practitioner working in designated rural or tribal health centers in MP.',
    applicationProcess: 'Submit joining report at the respective CMHO office.',
    requiredDocuments: ['Medical Registration Certificate', 'Posting Order', 'Bank Account Details'],
    officialUrl: 'https://health.mp.gov.in',
    ministry: 'Department of Public Health and Family Welfare (MP)',
    schemeType: 'State Scheme',
    occupationTags: ['doctor', 'medical', 'nurse', 'healthcare'],
    stateTags: ['madhya_pradesh'],
    genderTags: [],
    educationTags: ['bachelor', 'master'],
    ageMin: 22,
    ageMax: 60,
    incomeMin: null,
    incomeMax: null,
    isActive: true,
  },
  {
    slug: 'mukhyamantri-kanya-vivah-yojana',
    title: 'Mukhyamantri Kanya Vivah Yojana',
    description: 'Financial assistance for the marriage of girls from poor families.',
    category: 'Social Welfare',
    targetGroup: 'Women from poor families',
    benefits: 'Financial assistance of Rs. 51,000 for marriage.',
    eligibility: 'The girl must be 18 years or above. The family must be domiciled in Madhya Pradesh and living below the poverty line.',
    applicationProcess: 'Apply at Gram Panchayat / Janpad Panchayat or Urban Local Body.',
    requiredDocuments: ['Age Proof', 'BPL Card', 'Domicile Certificate', 'Bank Account Details'],
    officialUrl: 'http://samagra.gov.in',
    ministry: 'Department of Social Justice and Disabled Person Welfare',
    schemeType: 'State Scheme',
    occupationTags: [],
    stateTags: ['madhya_pradesh'],
    genderTags: ['female'],
    educationTags: [],
    ageMin: 18,
    ageMax: null,
    incomeMin: null,
    incomeMax: '100000',
    isActive: true,
  },
  {
    slug: 'pm-mudra-yojana',
    title: 'Pradhan Mantri Mudra Yojana (PMMY)',
    description: 'Provides loans up to 10 lakh to the non-corporate, non-farm small/micro enterprises.',
    category: 'Business & Entrepreneurship',
    targetGroup: 'Small business owners, Entrepreneurs',
    benefits: 'Collateral free loans classified into Shishu (upto 50,000), Kishore (50,000 to 5 Lakh) and Tarun (5 Lakh to 10 Lakh).',
    eligibility: 'Any Indian Citizen who has a business plan for a non-farm sector income generating activity.',
    applicationProcess: 'Apply at any bank, NBFC, MFI or online at Udyamimitra portal.',
    requiredDocuments: ['Identity Proof', 'Address Proof', 'Business Proof', 'Project Report'],
    officialUrl: 'https://www.mudra.org.in',
    ministry: 'Ministry of Finance',
    schemeType: 'Central Sector Scheme',
    occupationTags: ['business', 'entrepreneur', 'self_employed'],
    stateTags: [],
    genderTags: [],
    educationTags: [],
    ageMin: 18,
    ageMax: 65,
    incomeMin: null,
    incomeMax: null,
    isActive: true,
  },
  {
    slug: 'ladli-laxmi-yojana',
    title: 'Ladli Laxmi Yojana',
    description: 'Welfare scheme by the Government of Madhya Pradesh to improve the educational, health, and economic status of girl children.',
    category: 'Education & Welfare',
    targetGroup: 'Girl children and their families',
    benefits: 'Total of ₹1.18 lakh financial assistance at various stages of the girl\'s life to support her education and discourage child marriage.',
    eligibility: 'Girls born on or after Jan 1, 2006. Parents must be residents of MP, non-income tax payers, with max two children.',
    applicationProcess: 'Apply directly through Anganwadi worker or online portal.',
    requiredDocuments: ['Birth Certificate', 'Aadhaar Card', 'Samagra ID', 'Bank Account Details', 'Photo'],
    officialUrl: 'http://ladlilaxmi.mp.gov.in/',
    ministry: 'Women and Child Development Department (MP)',
    schemeType: 'State Scheme',
    occupationTags: [],
    stateTags: ['madhya_pradesh'],
    genderTags: ['female'],
    educationTags: [],
    ageMin: 0,
    ageMax: 21,
    incomeMin: null,
    incomeMax: '250000',
    isActive: true,
  },
  {
    slug: 'ladli-behna-yojana',
    title: 'Mukhyamantri Ladli Behna Yojana',
    description: 'Initiative by Madhya Pradesh Government to empower women economically, improve health, and enhance decision-making.',
    category: 'Social Welfare',
    targetGroup: 'Married women (including widows, divorced)',
    benefits: 'Monthly financial aid of ₹1,250 (₹15,000 annually) transferred via DBT.',
    eligibility: 'Married women aged 21 to 60 years. Permanent residents of MP. Combined family income less than ₹2.5 lakh. Non-income tax payers.',
    applicationProcess: 'Apply online on official portal or at designated Gram Panchayat / Ward offices.',
    requiredDocuments: ['Aadhaar Card', 'Samagra ID', 'Bank Passbook (Aadhaar linked)', 'Residency Proof'],
    officialUrl: 'https://cmladlibahna.mp.gov.in',
    ministry: 'Women and Child Development Department (MP)',
    schemeType: 'State Scheme',
    occupationTags: [],
    stateTags: ['madhya_pradesh'],
    genderTags: ['female'],
    educationTags: [],
    ageMin: 21,
    ageMax: 60,
    incomeMin: null,
    incomeMax: '250000',
    isActive: true,
  }
]

async function seed() {
  console.log('Seeding schemes...')
  try {
    for (const scheme of SEED_SCHEMES) {
      await db.insert(schemes)
        .values(scheme)
        .onConflictDoUpdate({
          target: schemes.slug,
          set: scheme,
        })
      console.log(`Upserted scheme: ${scheme.slug}`)
    }
    console.log('Seeding complete!')
  } catch (error) {
    console.error('Error seeding schemes:', error)
  } finally {
    await client.end()
  }
}

seed()
