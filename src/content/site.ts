/** Single switches for content that goes stale. */
export const site = {
  url: 'https://layeser.github.io',
  name: 'Sekou Kaba',
  /** CV says "available immediately" as of Nov 2026. Turn off in one edit when it is no longer true. */
  availability: { enabled: true },
  /** split so naive scrapers do not find the address in the HTML */
  email: { user: 'sekou.kaba.pro', domain: 'gmail.com' },
  linkedin: 'https://www.linkedin.com/in/sekou-kaba-ai',
  github: 'https://github.com/Layeser',
  portfolioRepo: 'https://github.com/Layeser/ai-portfolio',
  kaggle: 'https://www.kaggle.com/competitions/text-to-motion-retrieval/leaderboard',
} as const
