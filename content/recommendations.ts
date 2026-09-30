import type { Recommendation } from './types'

/** Where all written recommendations live */
export const recommendationsUrl = 'https://www.linkedin.com/in/oleksandr-kashytskyi-07974b22b/details/recommendations/'

/**
 * People who wrote a recommendation on LinkedIn (see the References section of the CV).
 * Paste a short excerpt into `quote` to show it on the site; without one, the card just links to LinkedIn.
 */
export const recommendations: Recommendation[] = [
    {
        name: 'Martin Durny',
        role: 'Former Team Lead',
        organisation: 'GoodRequest'
    },
    {
        name: 'Jose Paredes',
        role: 'MSc Supervisor',
        organisation: 'University of Roehampton'
    }
]
