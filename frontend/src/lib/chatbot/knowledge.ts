export type KnowledgeChunk = {
  id: string
  category:
    | 'project'
    | 'mission'
    | 'ai'
    | 'moil'
    | 'satellite'
    | 'features'
    | 'team'
    | 'faq'
    | 'geology'
  keywords: string[]
  question: string
  answer: string
  actionButton?: {
    label: string
    type: 'blending' | 'dewatering' | 'borehole' | 'risk' | 'guidance'
    data?: any
  }
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: 'k1',
    category: 'project',
    keywords: ['what', 'is', 'nakshatra', 'project', 'about', 'overview', 'discovery', 'hidden'],
    question: 'How does NAKSHATRA-X discover hidden manganese reserves?',
    answer:
      "Hello! I'm thrilled you asked. NAKSHATRA-X acts as your eyes in orbit and on the ground. We combine Sentinel-2 shortwave infrared (SWIR) satellite absorption bands with ISRO Bhuvan multispectral feeds to spot pyrolusite ore reefs hidden deep under Indian soil — saving millions in exploratory drilling before a single drill rig touches the ground!",
  },
  {
    id: 'k2',
    category: 'mission',
    keywords: ['mission', 'goal', 'objective', 'motive', 'why', 'future', 'india', 'self-reliant'],
    question: 'What is our core mission for India?',
    answer:
      "Our mission is deeply personal for us — to empower Ministry of Steel & MOIL Ltd with total manganese self-reliance. Manganese is the backbone of Indian steel production. By predicting shortages weeks before they happen and finding rich unmapped reserves, we ensure our mines run at peak performance every single day.",
  },
  {
    id: 'k3',
    category: 'features',
    keywords: ['monsoon', 'flooding', 'shortfall', 'prevent', 'weather', 'dewatering', 'haul road'],
    question: 'Can we prevent monsoon pit flooding and shortfall?',
    answer:
      "Absoutely, yes! Monsoons can be tough on open-pit haul roads, but we don't let heavy rain catch us off guard. We connect directly to ISRO MOSDAC precipitation sensors. When pit water or rainfall approaches safety limits, our system automatically alerts pit managers and triggers SCADA pumps to clear water before dumpers slow down.",
    actionButton: {
      label: 'Broadcast Emergency Dewatering Dispatch',
      type: 'dewatering',
    },
  },
  {
    id: 'k4',
    category: 'features',
    keywords: ['blend', 'blending', 'stockpile', 'scipy', 'grade', 'target', 'spec'],
    question: 'Walk me through the SciPy ore blending optimization',
    answer:
      "I'd love to! Maintaining contract grade above 41% Mn without wasting premium ore used to be a tough balancing act. Our SciPy Simplex algorithm calculates the perfect blend ratio across your SP-1, SP-2, and SP-3 stockpiles in milliseconds — guaranteeing top-quality delivery while saving average ₹148,000 per shipment!",
    actionButton: {
      label: 'Apply Blending Ratios to Stockpile Dispatch',
      type: 'blending',
    },
  },
  {
    id: 'k5',
    category: 'satellite',
    keywords: ['satellite', 'accuracy', 'spectral', 'sentinel', 'swir', 'isro', 'bhuvan', 'radar'],
    question: 'What makes our satellite sensing so accurate?',
    answer:
      "It comes down to multi-spectral harmony! Sentinel-2 SWIR bands (1.61µm & 2.20µm) pinpoint hydroxyl mineral dips unique to manganese pyrolusite. We pair that with ISRO Bhuvan's 5.8m high-resolution boundary mapping and RISAT-1A SAR radar to see right through cloud cover and soil moisture.",
  },
  {
    id: 'k6',
    category: 'ai',
    keywords: ['ai', 'models', 'random', 'forest', 'xgboost', 'accuracy', 'shap', 'explainability'],
    question: 'Which AI models power our predictions?',
    answer:
      "We built a robust ensemble engine! A 200-tree Random Forest classifier handles surface prospectivity with 98.7% training accuracy and 0.995 ROC-AUC. For production forecasting, we rely on XGBoost and Prophet. Most importantly, TreeSHAP waterfall graphs explain *why* every prediction was made so geologists can trust the data completely.",
  },
  {
    id: 'k7',
    category: 'geology',
    keywords: ['borehole', 'kriging', '3d', 'balaghat', 'bharweli', 'unfc', '111', 'assay'],
    question: 'How does 3D borehole Kriging work for Balaghat & Central India?',
    answer:
      "Central India's Sausar Group (Balaghat, Bharweli, Dongri, Tirodi) holds some of the richest manganese synclines in the world. Our 3D Inverse Distance Weighting Kriging engine interpolates core drill logs to map proved UNFC 111 reserve seams in 3D — giving you clear lithology views before planning extraction benches.",
    actionButton: {
      label: 'View 3D Lithology Seam Block Map',
      type: 'borehole',
    },
  },
  {
    id: 'k8',
    category: 'features',
    keywords: ['guidance', 'dashboard', 'navigate', 'help', 'mission', 'control', 'use'],
    question: 'Guide me through Mission Control!',
    answer:
      "Welcome to Mission Control! You can explore the interactive 3D map to view SWIR probability layers, run SciPy stockpile blenders, inspect 3D borehole assays, or trigger SCADA alerts. Click any mine on the map or type a city name to view tailored geological prospectivity instantly!",
  },
  {
    id: 'k9',
    category: 'faq',
    keywords: ['brief', 'concise', 'short', 'executive', 'quick', 'summary', 'yes'],
    question: 'Is it brief and executive-ready?',
    answer:
      "Yes! Every response and dossier is designed to be crisp, clear, and actionable. We give you exact figures, confidence percentages, and 1-click action buttons so you can make confident decisions in seconds.",
  },
  {
    id: 'k10',
    category: 'team',
    keywords: ['team', 'built', 'sih', '26009', 'people', 'hackathon'],
    question: 'Who is behind NAKSHATRA-X?',
    answer:
      "We are a passionate team of engineers, geologists, and designers built for Smart India Hackathon 2026 (Problem Statement 26009). We poured our hearts into building a space-geological system that truly serves India's mining operators and Ministry of Steel.",
  },
]
