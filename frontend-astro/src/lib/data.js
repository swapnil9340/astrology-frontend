// Static content used across the site.

export const zodiacSigns = [
  { name: "Aries", hindi: "मेष", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire" },
  { name: "Taurus", hindi: "वृषभ", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth" },
  { name: "Gemini", hindi: "मिथुन", symbol: "♊", dates: "May 21 – Jun 20", element: "Air" },
  { name: "Cancer", hindi: "कर्क", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water" },
  { name: "Leo", hindi: "सिंह", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire" },
  { name: "Virgo", hindi: "कन्या", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth" },
  { name: "Libra", hindi: "तुला", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air" },
  { name: "Scorpio", hindi: "वृश्चिक", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water" },
  { name: "Sagittarius", hindi: "धनु", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire" },
  { name: "Capricorn", hindi: "मकर", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth" },
  { name: "Aquarius", hindi: "कुम्भ", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air" },
  { name: "Pisces", hindi: "मीन", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water" },
];

export const services = [
  {
    icon: "🪔",
    title: "Free Kundli",
    desc: "Generate your detailed Vedic birth chart with planetary positions & dashas.",
    href: "/kundli",
    accent: "gold",
  },
  {
    icon: "💑",
    title: "Kundli Matching",
    desc: "Ashtakoot Guna Milan for marriage compatibility & Mangal dosha check.",
    href: "/kundli-matching",
    accent: "rose",
  },
  {
    icon: "🌙",
    title: "Daily Horoscope",
    desc: "Your personalised rashifal for love, career, health & money today.",
    href: "/horoscope",
    accent: "violet",
  },
  {
    icon: "🕉️",
    title: "Panchang",
    desc: "Tithi, Nakshatra, Yoga, Karana & auspicious muhurat for any date.",
    href: "/panchang",
    accent: "gold",
  },
  {
    icon: "🔮",
    title: "Tarot Reading",
    desc: "Pick a card and reveal the guidance the universe has for you today.",
    href: "/tarot",
    accent: "violet",
  },
  {
    icon: "🔢",
    title: "Numerology",
    desc: "Discover your life-path & destiny number from your name and birth date.",
    href: "/numerology",
    accent: "rose",
  },
  {
    icon: "💎",
    title: "Gemstones",
    desc: "Know which gemstone strengthens your planets and changes your fortune.",
    href: "/gemstones",
    accent: "gold",
  },
  {
    icon: "🧿",
    title: "Lal Kitab",
    desc: "Simple, powerful remedies from the legendary Lal Kitab tradition.",
    href: "/lal-kitab",
    accent: "violet",
  },
];

export const astrologers = [
  { name: "Acharya Vinod", skill: "Vedic • KP", exp: "18 yrs", lang: "Hindi, English", rate: 24, rating: 4.9, online: true },
  { name: "Pt. Sharma", skill: "Numerology", exp: "12 yrs", lang: "Hindi", rate: 18, rating: 4.8, online: true },
  { name: "Meera Joshi", skill: "Tarot • Vastu", exp: "9 yrs", lang: "English, Marathi", rate: 30, rating: 5.0, online: true },
  { name: "Dr. Rao", skill: "Vedic • Palmistry", exp: "22 yrs", lang: "Telugu, English", rate: 35, rating: 4.9, online: false },
  { name: "Anjali Verma", skill: "Lal Kitab", exp: "7 yrs", lang: "Hindi, Punjabi", rate: 15, rating: 4.7, online: true },
  { name: "Guru Prakash", skill: "Vedic • Remedies", exp: "27 yrs", lang: "Hindi, Sanskrit", rate: 40, rating: 5.0, online: true },
];

export const navLinks = [
  { label: "Horoscope", href: "/horoscope" },
  { label: "Free Kundli", href: "/kundli" },
  { label: "Matching", href: "/kundli-matching" },
  { label: "Panchang", href: "/panchang" },
  { label: "Astrologers", href: "/#astrologers" },
  { label: "Shop", href: "/#shop" },
];

// Deterministic pseudo-horoscope so SSR and client match (no Math.random on render).
const lines = [
  "The stars favour a bold decision today — trust your instinct.",
  "A financial door opens; keep your paperwork ready.",
  "Someone from the past may reconnect. Stay warm but wise.",
  "Health improves with an early start and a lighter dinner.",
  "Your patience is being tested at work — it pays off by evening.",
  "Love blossoms through small, honest gestures today.",
  "Avoid lending money; save your energy for creative work.",
  "Travel plans firm up. Double-check dates and bookings.",
];

export function horoscopeFor(signName) {
  let sum = 0;
  for (const ch of signName) sum += ch.charCodeAt(0);
  return {
    love: 55 + (sum % 45),
    career: 50 + ((sum * 3) % 50),
    health: 60 + ((sum * 7) % 40),
    text: lines[sum % lines.length],
  };
}
