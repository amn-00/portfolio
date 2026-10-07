// ============================================================
//  ALL SITE CONTENT LIVES HERE. Edit this file to update the site.
// ============================================================

export const profile = {
  name: "Aman Chaudhary",
  handle: "aman", // shown in the logo as "aman.dev"
  lede:
    "AI engineer building and evaluating LLM systems: agent memory, retrieval and evals, plus the full-stack apps around them. Open to AI/ML, GenAI and full-stack roles.",
  pills: ["Immediate joiner"],
  email: "amanchaudharyy01@gmail.com",
  // Put your resume at public/resume.pdf. Set to "" to hide the Resume button (GitHub button shows instead).
  resume: "/resume.pdf",
  links: {
    github: "https://github.com/amn-00",
    linkedin: "https://linkedin.com/in/aman-chaudhary-dev",
    leetcode: "https://leetcode.com/u/amanchaudharyy01",
  },
  // FUT-style player card in the hero. Keep ratings modest and defensible.
  card: {
    name: "AMAN",
    rating: 94,
    position: "AI \nENGINEER",
    stats: [
      { label: "PY", value: 92, full: "Python" },
      { label: "LLM", value: 90, full: "LLM apps & tool use" },
      { label: "RAG", value: 88, full: "Retrieval & embeddings" },
      { label: "MEM", value: 89, full: "Agent memory systems" },
      { label: "EVAL", value: 86, full: "Evals & benchmarks" },
      { label: "DSA", value: 88, full: "Data structures & algorithms" },
    ],
  },
  // Terminal (stats section): each entry is a command and the lines it prints each entry is a command and the lines it prints
  terminal: [
    { cmd: "whoami", out: ["Aman Chaudhary · AI engineer (LLM systems + full-stack)"] },
    { cmd: "ls ~/projects", out: ["lethe/  devpulse/  sentiment/  real-estate/  isles-of-kaira/"] },
    { cmd: "cat lethe/README.md", out: ["Long-term memory for LLM agents.", "97% on held-out tests with 88% fewer memories."] },
    { cmd: "pytest -q lethe", out: ["✓ 48 passed"] },
    { cmd: "npm test --prefix devpulse", out: ["✓ 17 integration tests passed"] },
    { cmd: "status", out: ["open to work · immediate joiner"] },
  ],
};

export const navLinks = [
  { label: "What I bring", href: "#bring" },
  { label: "Projects", href: "#work" },
  { label: "Stats", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

// icon: "chart" | "bolt" | "globe"
export const perks = [
  { icon: "chart", title: "Eval-first AI", text: "I measure before I claim: baselines, held-out sets, an LLM judge and repeated runs with confidence intervals." },
  { icon: "bolt", title: "Ships to prod", text: "CI/CD, integration tests and live deploys, even on a 512 MB free tier." },
  { icon: "globe", title: "Ready day one", text: "Fresher, immediate joiner. 5-day office anywhere in India, or abroad with sponsorship." },
];

// Filter chips. Each project's `cat` must match one of these keys.
export const categories = [
  { key: "all", label: "All work" },
  { key: "ai", label: "AI / ML" },
  { key: "full", label: "Full-Stack" },
  { key: "back", label: "Backend" },
  { key: "front", label: "Frontend" },
];

export const projects = [
  {
    title: "lethe",
    badge: "Flagship",
    cat: "ai",
    desc: "Long-term memory for LLM agents. It pulls durable facts out of chats, keeps a small active set in ChromaDB, archives the weakest memories and reloads them when a question needs them. Benchmarked against 4 baselines.",
    stat: "97% accuracy · 88% fewer memories",
    tags: ["Python", "FastAPI", "ChromaDB", "Groq", "48 tests"],
    links: [
      { label: "Live demo", href: "https://lethe-agent-memory.onrender.com" },
      { label: "Code", href: "https://github.com/amn-00/lethe-agent-memory" },
    ],
  },
  {
    title: "DevPulse",
    badge: "Flagship",
    cat: "full",
    desc: "Async standup and blocker tracker. Groq LLaMA turns updates into structured daily standup summaries, with JWT auth, a PostgreSQL schema and Redis caching.",
    stat: "17 Jest/Supertest tests in CI",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Redis", "GitHub Actions"],
    links: [
      { label: "Live demo", href: "https://devpulse-kappa-rouge.vercel.app" },
      { label: "Code", href: "https://github.com/amn-00/devpulse" },
    ],
  },
  {
    title: "Sentiment Analyzer",
    cat: "ai",
    desc: "Benchmarked TF-IDF + logistic regression against DistilBERT. TF-IDF hit 93.3% at 0.03 ms per input, 259× faster, so it serves in production with DistilBERT as the accuracy upgrade path.",
    stat: "93.3% · 0.03 ms/input · 259× faster",
    tags: ["Flask", "Scikit-learn", "DistilBERT", "Docker"],
    links: [
      { label: "Live demo", href: "https://sentiment-analysis-nlp-rrme.onrender.com" },
      { label: "Code", href: "https://github.com/amn-00/sentiment-analysis-nlp" },
    ],
  },
  {
    title: "Real Estate Valuation",
    cat: "ai",
    desc: "Property price model tuned with GridSearchCV and served through a Streamlit app.",
    stat: "R² 0.82 · RMSE −32.8%",
    tags: ["XGBoost", "GridSearchCV", "Streamlit"],
    links: [
      { label: "Live demo", href: "https://real-estate-price-predictor-zbeesxpajdfgcuy6bgemu2.streamlit.app" },
      { label: "Code", href: "https://github.com/amn-00/real-estate-price-predictor" },
    ],
  },
  {
    title: "Diagnostics Booking API",
    cat: "back",
    desc: "Backend for booking diagnostic tests, with a mock payments flow.",
    stat: "REST API",
    tags: ["Backend", "Payments flow"],
    links: [{ label: "Code", href: "https://github.com/amn-00/eve-diagnostics-booking-api" }],
  },
  {
    title: "Isles of Kaira",
    cat: "front",
    desc: "Interactive fantasy world map drawn in SVG and driven by vanilla JavaScript.",
    stat: "Zero frameworks",
    tags: ["JavaScript", "SVG", "Vercel"],
    links: [
      { label: "Live demo", href: "https://isles-of-kaira.vercel.app" },
      { label: "Code", href: "https://github.com/amn-00/isles-of-kaira" },
    ],
  },
];

// icon: "star" | "scroll" | "lens" | "badge"  (pixel icons in PixelIcon.jsx)
export const achievements = [
  { icon: "star", title: "CGPA 8.45, top 5%", text: "Integrated B.Tech + M.Tech CS (AI & Robotics), Gautam Buddha University, 2021–2026" },
  { icon: "scroll", title: "Thesis accepted at NetCrypt 2026, JNU", text: "Hybrid ACO-GA smart contract optimization: 36% faster convergence, 41% risk reduction vs pure ACO" },
  { icon: "lens", title: "Cyber security intern, Amroha Police", text: "OSINT on 10+ cybercrime cases; found 3+ web vulnerabilities (XSS, IDOR) via bug bounties" },
  { icon: "badge", title: "Machine Learning Specialization", text: "DeepLearning.AI & Stanford, plus Kaggle Intermediate ML and NPTEL Blockchain" },
];

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"] },
  { group: "AI / LLM", items: ["LLMs", "RAG", "Agent memory", "LLM evals", "LLM-as-judge", "Vector search", "ChromaDB", "FastEmbed", "Groq", "Hugging Face"] },
  { group: "ML", items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "OpenCV", "Pandas", "NumPy"] },
  { group: "Web & APIs", items: ["FastAPI", "Flask", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Redis"] },
  { group: "Cloud & infra", items: ["Docker", "AWS", "GitHub Actions", "pytest", "Linux", "Render", "Vercel"] },
];
