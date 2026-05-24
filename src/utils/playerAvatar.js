const AVATAR_BASE = {
  backgroundColor: 'ffc827,f5d78e,e8b86d',
  radius: '50',
  mouth: 'smile,smirk',
  shirt: 'collared,crew,open',
  glassesProbability: '15'
};

const GENDER_OPTIONS = {
  male: {
    hair: 'fonze,mrClean,mrT,dannyPhantom,dougFunny',
    facialHair: 'beard,scruff',
    facialHairProbability: '55',
    eyebrows: 'down,up',
    eyes: 'eyes,round,smiling'
  },
  female: {
    hair: 'pixie',
    facialHairProbability: '0',
    eyebrows: 'eyelashesDown,eyelashesUp',
    eyes: 'eyes,round,smiling,smilingShadow'
  }
};

export function getPlayerAvatarUrl(seed, gender = 'male') {
  const options = GENDER_OPTIONS[gender] || GENDER_OPTIONS.male;
  const params = new URLSearchParams({
    seed,
    ...AVATAR_BASE,
    ...options
  });
  return `https://api.dicebear.com/9.x/micah/svg?${params.toString()}`;
}
