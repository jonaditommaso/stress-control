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
  stressed: ['#FFD1DC', '#FF6F61', '#8B0000']
};

export const getStressColors = (stress) => {
  if (stress >= 0 && stress <= 33) return STRESS_COLORS.quiet;

  if (stress >= 34 && stress <= 65) return STRESS_COLORS.tense;

  if (stress >= 66 && stress <= 100) return STRESS_COLORS.stressed;
};

export const LANGUAGES = {
  en: 'English',
  es: 'Español'
};

export const CONTAINER_COLORS = [
  { name: 'low', size: 30, colors: ['#A0E9FF', '#0DA0CC', '#0DCC86', '#0ADA3B'] },
  { name: 'medium', size: 50, colors: ['#FF9130', '#F1C24C', '#D8DB14', '#FFFC00'] },
  { name: 'high', size: 80, colors: ['#CE5A67', '#C70B21', '#FF4000', '#E40078'] }
];

export const STRESS_LEVELS = [
  { type: 'low', modify: false },
  { type: 'medium', modify: false },
  { type: 'moderately-high', modify: true },
  { type: 'high', modify: false }
];
