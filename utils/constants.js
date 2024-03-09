export const CONTAINER_CONFIG = {
  high: {
    color: '#CE5A67',
    label: 'Vale la pena!',
    size: 80
  },
  medium: {
    color: '#FF9130',
    label: 'Tienes tiempo para esto',
    size: 50
  },
  low: {
    color: '#A0E9FF',
    label: 'Resuelve estas tareas ya!',
    size: 30
  }
};

export const LETTER_SIZES = [
  { label: 'C', size: 16 },
  { label: 'M', size: 20 },
  { label: 'G', size: 28 }
];

const STRESS_COLORS = {
  quiet: ['#C1FFC1', '#3CB371', '#008000'],
  tense: ['#FFE8A1', '#FFD966', '#f6b000'],
  littleStressed: ['#FFDAB9', '#FB8B24', '#E36414'],
  stressed: ['#FFD1DC', '#FF6F61', '#8B0000']
};

export const getStressColors = (stress, max, length) => {
  const part = max / length;

  if (stress >= 0 && stress <= part) return STRESS_COLORS.quiet;
  if (stress > part && stress <= part * 2) return STRESS_COLORS.tense;
  if (length === 4 && stress > part && stress <= part * 3) return STRESS_COLORS.littleStressed;
  return STRESS_COLORS.stressed;
};

export const LANGUAGES = {
  en: 'English',
  es: 'Español'
};

export const CONTAINER_COLORS = [
  { name: 'low', size: 50, fontSize: 16, colors: ['#0061A9', '#0DA0CC', '#0DCC86', '#0ADA3B'] },
  { name: 'medium', size: 65, fontSize: 18, colors: ['#FF9130', '#F1C24C', '#EFA900', '#FF4000'] },
  { name: 'high', size: 80, fontSize: 18, colors: ['#CE5A67', '#C70B21', '#E40078', '#EE1fff'] }
];

export const STRESS_LEVELS = [
  { type: 'low', modify: false },
  { type: 'medium', modify: false },
  { type: 'moderately-high', modify: true },
  { type: 'high', modify: false }
];

export const ACTIVITIES_TYPE = [
  {
    title: 'long-term',
    type: 'high',
    customColor: '#8B0000',
    percent: 15
  },
  {
    title: 'medium-term',
    type: 'medium',
    customColor: '#f6b000',
    percent: 10
  },
  {
    title: 'quick-task',
    type: 'low',
    customColor: '#008000',
    percent: 5
  }
];
