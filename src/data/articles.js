/* Mock editorial articles data. This file contains a static, in-memory collection of article objects used to
simulate an internal editorial CMS for a fashion/magazine publisher. This data represents a mix of drafts, articles
in review, scheduled pieces, and published stories across different categories. 

This mock dataset is intentionally used in place of a backend API to allow the frontend application to focus on React 
fundamentals:

- list rendering (map, filter, sort)
- immutable state updates
- controlled and uncontrolled form inputs
- context and memoization */

const articles = [
  {
    id: "1",
    headline: "The Runway: New Trends for Fall 2025",
    deck: "A deep dive into the upcoming season's top designers and their collections.",
    author: "Jane Doe",
    category: "Fashion",
    status: "Published",
    publishAt: "2025-09-15",
    updatedAt: "2025-09-10",
    tags: ["runway", "fall", "2025", "designers"],
    body: "This season's runway is showcasing bold colors, innovative textures, and a resurgence of classic cuts...",
  },
  {
    id: "2",
    headline: "Behind the Lens: The Future of Fashion Photography",
    deck: "Exploring the evolution of fashion photography and the new faces behind the camera.",
    author: "John Smith",
    category: "Photography",
    status: "Published",
    publishAt: "2025-08-20",
    updatedAt: "2025-08-15",
    tags: ["photography", "fashion", "visual arts"],
    body: "Fashion photography is evolving rapidly, with many new talents coming into the scene to challenge old norms...",
  },
  {
    id: "3",
    headline: "Exclusive Interview with Top Designer Lily James",
    deck: "We sit down with Lily James to discuss her career and upcoming projects.",
    author: "Emily Williams",
    category: "Culture",
    status: "In Review",
    publishAt: "2025-09-01",
    updatedAt: "2025-08-29",
    tags: ["interview", "designer", "fashion culture"],
    body: "Lily James has been a game-changer in the world of fashion. Her latest collection takes bold steps in merging classic designs with modern aesthetics...",
  },
  {
    id: "4",
    headline: "Sustainable Fashion: Is It the Future?",
    deck: "Exploring the impact of sustainability on the fashion industry and how designers are adapting.",
    author: "Sarah Lee",
    category: "Fashion",
    status: "Draft",
    publishAt: "",
    updatedAt: "2025-09-05",
    tags: ["sustainability", "eco-friendly", "fashion industry"],
    body: "With increasing awareness about environmental impact, designers are shifting toward sustainable practices, from sourcing materials to using eco-friendly production methods...",
  },
];

export default articles;
