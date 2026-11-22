// Central image registry. These are stock placeholders — drop real studio
// photos into /public/images and point these entries at them
// (e.g. `${BASE}/images/hero.jpg`, see `asset()` in lib/format.ts).
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: u("photo-1560066984-138dadb4c035", 2000),
  studio: u("photo-1521590832167-7bcbfaa6381f", 1600),
  studio2: u("photo-1562322140-8baeececf3df", 1600),
  styling: u("photo-1522337360788-8b13dee7a37e", 1400),
  teyana: u("photo-1531123897727-8f129e1688ce"),
  teyana2: u("photo-1589156280159-27698a70f29e"),
  rose: u("photo-1523824921871-d6f1a15151f1"),
  rose2: u("photo-1580618672591-eb180b1a973f"),
  toni: u("photo-1534528741775-53994a69daeb"),
  toni2: u("photo-1517841905240-472988babdf9"),
  ashe: u("photo-1544005313-94ddf0286df2"),
  ashe2: u("photo-1488426862026-3ee34a7d66df"),
  nia: u("photo-1492106087820-71f1a00d2b11"),
  amara: u("photo-1500917293891-ef795e70e1f6"),
  kit: u("photo-1595476108010-b4d1f102b1b1"),
  p1: u("photo-1519699047748-de8e457a634e", 900),
  p2: u("photo-1487412947147-5cebf100ffc2", 900),
  p3: u("photo-1512316609839-ce289d3eba0a", 900),
};
