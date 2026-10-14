// Single source of truth for the site's public URL (used by sitemap/robots/metadata).
// Set NEXT_PUBLIC_SITE_URL in the host env to your real domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.astrovedji.in"
).replace(/\/+$/, "");

export const SITE_NAME = "AstroVedji";
export const WHATSAPP_CHAT_URL =
  "https://wa.me/919340595938?text=Hi%2C%20I%27d%20like%20to%20chat%20with%20an%20astrologer.";
export const SITE_DESC =
  "Free Vedic astrology tools in Hindi and English: janam kundli, daily rashifal, kundli matching, live panchang and online astrologer consultations.";

// Broad homepage/site terms. Route pages should keep their own focused keywords
// so each page describes the service it actually offers.
export const SITE_KEYWORDS = [
  // English
  "free vedic astrology", "free online kundli", "janam kundli", "birth chart calculator",
  "kundli by date of birth", "online horoscope", "daily horoscope today", "daily rashifal",
  "kundli matching for marriage", "kundli milan", "guna milan", "mangal dosha check",
  "today panchang", "shubh muhurat", "talk to astrologer online", "tarot reading",
  "numerology calculator", "palm reading", "lal kitab remedies", "astrology gemstones",
  // Hindi
  "मुफ्त कुंडली", "फ्री जन्म कुंडली", "जन्म कुंडली ऑनलाइन", "जन्म तारीख से कुंडली",
  "कुंडली हिंदी में", "आज का राशिफल", "दैनिक राशिफल", "सभी राशियों का राशिफल",
  "कुंडली मिलान विवाह", "कुंडली गुण मिलान", "मंगल दोष जांच", "आज का पंचांग",
  "तिथि नक्षत्र", "शुभ मुहूर्त", "ऑनलाइन ज्योतिषी", "ज्योतिष से सलाह",
  "टैरो रीडिंग", "अंक ज्योतिष", "हस्तरेखा", "लाल किताब उपाय", "ज्योतिष रत्न",
  // Common Hinglish queries
  "free kundli in hindi", "janam kundali online", "aaj ka rashifal", "kundli milan for marriage",
  "aaj ka panchang", "jyotish se baat karein",
];
