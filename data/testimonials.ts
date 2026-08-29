export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /* Marks an entry as unfilled. Placeholders render with a visible PLACEHOLDER
     tag so nothing on the live site can be mistaken for a real endorsement.
     Delete the flag once the quote, name, role and company are real. */
  placeholder?: boolean;
};

/*
 * TO FILL: replace the copy below with real quotes and delete `placeholder`.
 * LinkedIn recommendations work well here — they are already public and
 * attributable, so they need no extra permission to reproduce.
 *
 * Keep them short. One problem, one change, one number reads better than a
 * paragraph of praise, and it matches how the rest of the site argues.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Replace with a real quote about the engagement — what was broken, what changed, and the number that moved.",
    name: "Name Surname",
    role: "VP Marketing",
    company: "Company",
    placeholder: true,
  },
  {
    quote:
      "Replace with a real quote. The most useful ones are specific about the diagnosis rather than the relationship.",
    name: "Name Surname",
    role: "Founder",
    company: "Company",
    placeholder: true,
  },
  {
    quote:
      "Replace with a real quote. A sentence on what working together was actually like is worth more than an adjective.",
    name: "Name Surname",
    role: "Head of Growth",
    company: "Company",
    placeholder: true,
  },
];
