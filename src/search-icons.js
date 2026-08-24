const normalize = (value) => String(value).trim().toLowerCase();

export function rankIconSearch(icon, query, metadata) {
  const normalized = normalize(query);
  if (!normalized) return 0;
  const name = normalize(icon.name);
  const slug = normalize(icon.slug);
  const loreName = normalize(icon.loreName);
  const cue = normalize(icon.cue);
  if (slug === normalized || name === normalized) return 100;
  if (metadata.aliases.includes(normalized)) return 95;
  if (metadata.deprecatedNames.includes(normalized)) return 90;
  if (metadata.tags.includes(normalized)) return 80;
  if (slug.startsWith(normalized) || name.startsWith(normalized)) return 70;
  if (metadata.aliases.some((alias) => alias.startsWith(normalized))) return 65;
  if (metadata.tags.some((tag) => tag.startsWith(normalized))) return 60;
  if (loreName === normalized) return 55;
  if ([slug, name, ...metadata.aliases, ...metadata.deprecatedNames].some((term) => term.includes(normalized))) return 45;
  if (metadata.tags.some((tag) => tag.includes(normalized))) return 40;
  if (loreName.includes(normalized)) return 30;
  if (cue.includes(normalized)) return 20;
  const tokens = normalized.split(/[^a-z0-9]+/).filter((token) => token.length > 1);
  if (tokens.length > 1) {
    const corpus = [slug, name, loreName, cue, ...metadata.aliases, ...metadata.deprecatedNames, ...metadata.tags].join(" ");
    if (tokens.every((token) => corpus.includes(token))) return 15;
  }
  return 0;
}

export function searchIcons(scope, query, metadataBySlug) {
  const normalized = normalize(query);
  if (!normalized) return scope;
  return scope
    .map((icon, index) => ({ icon, index, score: rankIconSearch(icon, normalized, metadataBySlug[icon.slug]) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map(({ icon }) => icon);
}
