import type { ParamMatcher } from '@sveltejs/kit';

const sections = new Set(['cover', 'services', 'quote', 'partners', 'support']);

export const match: ParamMatcher = (param) => sections.has(param);
