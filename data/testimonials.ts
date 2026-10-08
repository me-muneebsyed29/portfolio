export type Testimonial = {
  /* The full quote, verbatim, one string per paragraph. Never paraphrased.
     "Read in full" opens this. */
  quote: string[];
  /* One line for the sticky note: a verbatim slice of `quote`, with an
     ellipsis where it starts or stops mid-sentence. */
  note: string;
  name: string;
  role: string;
  company: string;
  /* The lead note shows a number big. Only one testimonial carries one. */
  metric?: { value: string; label: string };
  /* A brand from the Brands wall, tagged on the note. */
  brand?: string;
};

/* Order is the order on the wall: the number first, then the brand name. */
export const testimonials: Testimonial[] = [
  {
    quote: [
      "I have had the pleasure of working with Syed for the past 6 months, during which time he has managed my YouTube ads for my career coaching business.",
      "Prior to working with Syed, I was achieving a ROAS of 1 to 1.5. After Syed took over the campaign, I was comfortably doing 2 to 3.3 ROAS. This was a significant improvement in revenue and profits, and I have never achieved these results previously.",
      "Syed's expertise in performance marketing is evident in his ability to quickly identify and implement strategies that drive results. He is also very data-driven and always seeks to optimise campaigns for maximum efficiency.",
      "One of Syed's most important character traits is his extreme ownership. He takes full responsibility for his work and always makes sure that campaigns are delivered on time and within budget.",
      "I have no doubt that Syed would be an asset to any company that is looking for a talented and results-oriented performance marketer. He is a highly skilled professional with a proven track record of success.",
    ],
    note: "After Syed took over the campaign, I was comfortably doing 2 to 3.3 ROAS.",
    name: "Karunakaran Nagarajan",
    role: "Career Coach",
    company: "YouTube lead gen",
    metric: { value: "3.3x", label: "ROAS, up from 1.5" },
  },
  {
    quote: [
      "I worked with Syed when he was part of Growth Hackers and the main point of contact servicing the Universal Robots account.",
      "He is a quick learner, and was prompt in replying to our questions, and a great help with localising our campaigns to better suit the India market, and was in general easy to work with.",
    ],
    note: "…a great help with localising our campaigns to better suit the India market…",
    name: "Amanda Kwok",
    role: "Global Marketing Manager, APAC",
    company: "Universal Robots",
    brand: "Universal Robots",
  },
  {
    quote: [
      "Syed was great at building our ad streams on Google & Meta platforms for user acquisition. He worked well to understand what kind of targets we wanted to achieve, who did we want to acquire and ran the right experiments to reach our audience while bringing down our costs of acquisition.",
    ],
    note: "…ran the right experiments to reach our audience while bringing down our costs of acquisition.",
    name: "Sapan Shah",
    role: "Founder and CEO",
    company: "Yoro News",
  },
  {
    quote: [
      "I had the pleasure of working alongside Syed, and I can say without hesitation that he is both an exceptionally skilled paid media marketer and a genuinely great human being.",
      "Syed's expertise in all platforms is top-tier. He approaches every campaign with data-driven strategy and clear business impact in mind. Beyond his technical skills, his warmth, integrity, and collaborative spirit make him an absolute joy to work with. Any team would be incredibly lucky to have him!",
    ],
    note: "He approaches every campaign with data-driven strategy and clear business impact in mind.",
    name: "Sowmiya",
    role: "Team Lead",
    company: "GALE",
  },
  {
    quote: [
      "Syed is an awesome Digital Marketer. We were struggling to get the quality leads for our business when Syed came as a saviour for us. He first understood our business & challenges and then made a proper strategy. he made all the ads campaigns and things started changing. we start getting the quality leads with a good Conversion. I would highly recommend him as an FB & Google Ads Expert. All the best Syed, Keep shining 🌟.",
    ],
    note: "He first understood our business & challenges and then made a proper strategy.",
    name: "Vikash Sharma",
    role: "Founder",
    company: "BeautyGlad",
  },
  {
    quote: [
      "Muneeb is great at his work. I have always been satisfied with his results, and the way he tackles challenges. I would highly recommend him for performance marketing.",
    ],
    note: "I would highly recommend him for performance marketing.",
    name: "Shivalika Chopra",
    role: "Founder",
    company: "Billionvisits Media",
  },
];
