const AVATAR_BASE = {
  backgroundColor: 'ffc827,f5d78e,e8b86d',
  radius: '50'
};

/**
 * Hombres: adventurer-neutral (rasgos masculinos claros).
 * Mujeres: lorelei (retratos femeninos).
 */
export function getPlayerAvatarUrl(seed, gender = 'male') {
  if (gender === 'female') {
    const params = new URLSearchParams({
      seed,
      ...AVATAR_BASE,
      beardProbability: '0',
      hairAccessoriesProbability: '15'
    });
    return `https://api.dicebear.com/9.x/lorelei/svg?${params.toString()}`;
  }

  const params = new URLSearchParams({
    seed,
    ...AVATAR_BASE
  });
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?${params.toString()}`;
}
