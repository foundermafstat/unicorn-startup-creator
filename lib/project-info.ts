export const projectInfo = {
  name: "Unicorn Startup Creator & Presenter",
  tagline: "The AI Agent That Creates and Pitches the Next Generation of Billion-Dollar Startups",
  
  description: {
    full: "Unicorn Startup Creator & Presenter is an AI-powered agent that autonomously generates, validates, and pitches billion-dollar startup ideas. It compresses months of strategic, design, and storytelling work into a matter of minutes — powered by modular multi-agent architecture and advanced AI tooling.",
    
    core: "At the core of the system is its integration with ChainOpera AI, a flexible execution layer for high-context logic generation. Using dynamically registered endpoints, ChainOpera handles semantic business model synthesis, founder-narrative generation, investor-focused storytelling logic, and multi-modal component generation.",
    
    architecture: "Each generation request is routed from the client to a ChainOpera API endpoint with tailored logic. This modular approach allows the system to scale independently, create domain-specific reasoning chains, and fine-tune outputs based on user preferences or industry vertical."
  },

  developer: {
    name: "Ihor Sokolov",
    alias: "vibecoder",
    role: "Full-stack web developer",
    expertise: [
      "AI integration",
      "Real-time systems", 
      "Web3 product development"
    ],
    philosophy: {
      distributed: "Distributed, agent-based orchestration",
      apiFirst: "API-first logic extensibility",
      developerFocused: "Emphasis on developer-extendable backends and client UIs"
    }
  },

  chainOperaAI: {
    description: "ChainOpera AI is a flexible execution layer for high-context logic generation that allows the agent to dynamically adapt the generative logic pipeline.",
    
    capabilities: [
      "Contextual generation across multiple endpoints",
      "Chained reasoning via semantic memory", 
      "Role-based task execution and validation"
    ],
    
    design: "This 'logic-as-a-service' design empowers founders, incubators, and VC analysts to request custom project logic in natural language — and receive structured, validated startup data in return.",
    
    endpoints: [
      "/generate-vision-saas",
      "/validate-consumer-ai", 
      "/pitchdeck-web3-slide-structure"
    ],
    
    benefits: [
      "Domain-aware and adaptable",
      "Deeply customized for diverse startup contexts",
      "From fintech to biotech, B2B SaaS to creator economy"
    ]
  },

  problem: {
    title: "The Problem",
    description: "Creating successful startups is hard. Founders often:",
    challenges: [
      "Misread timing or market dynamics",
      "Struggle to pitch with clarity or confidence", 
      "Lack access to strategic or creative talent",
      "Waste time iterating manually without data",
      "Fail to validate ideas until it's too late"
    ],
    consequences: "This leads to wasted time, capital, and energy."
  },

  solution: {
    title: "The Solution", 
    description: "Unicorn Startup Creator changes the game. By combining real-time data, autonomous agents, and ChainOpera AI's logic endpoints, it:",
    capabilities: [
      "Surfaces valuable startup opportunities",
      "Validates concepts against real market signals",
      "Generates complete, investor-grade pitch materials", 
      "Delivers the pitch via lifelike avatar presenters",
      "Iterates through investor-style feedback loops"
    ],
    summary: "It's your co-founder, strategist, pitch coach, and creative director — all in one. Available via API, CLI, and visual UI."
  },

  features: {
    realTimeVoice: "Real-time voice interaction with AI agents",
    startupGeneration: "Autonomous startup idea generation and validation",
    pitchCreation: "Complete pitch deck and presentation creation",
    marketValidation: "Real-time market signal analysis",
    avatarPresentation: "Lifelike avatar presenters for pitch delivery",
    feedbackLoops: "Investor-style feedback and iteration cycles",
    multiModal: "Multi-modal content generation (diagrams, positioning maps)",
    domainAware: "Domain-specific reasoning for different industries"
  },

  technology: {
    core: [
      "OpenAI Realtime API",
      "WebRTC for real-time communication",
      "ChainOpera AI integration",
      "Next.js 15 with App Router",
      "TypeScript for type safety"
    ],
    ai: [
      "GPT-4o Realtime for voice interactions",
      "Whisper-1 for speech recognition",
      "Multi-agent architecture",
      "Semantic memory and reasoning"
    ],
    architecture: [
      "Modular micro-service design",
      "Dynamic endpoint registration",
      "API-first logic extensibility",
      "Distributed agent orchestration"
    ]
  },

  useCases: {
    founders: "Founders looking to validate and pitch startup ideas",
    incubators: "Startup incubators and accelerators",
    vcAnalysts: "VC analysts for deal flow analysis",
    entrepreneurs: "Entrepreneurs seeking strategic guidance",
    investors: "Investors evaluating startup opportunities"
  },

  availability: {
    platforms: ["API", "CLI", "Visual UI"],
    deployment: "Cloud-based with real-time capabilities",
    integration: "Extensible for custom workflows and integrations"
  }
};

export type ProjectInfo = typeof projectInfo;

// Voice agent responses for common questions
export const voiceResponses = {
  whatIsThis: `This is the ${projectInfo.name} - ${projectInfo.tagline}. It's an AI-powered agent that autonomously generates, validates, and pitches billion-dollar startup ideas, compressing months of strategic work into minutes.`,
  
  whoBuiltIt: `The system was architected and implemented by ${projectInfo.developer.name}, also known as ${projectInfo.developer.alias}. He's a full-stack web developer with extensive experience in AI integration, real-time systems, and Web3 product development.`,
  
  howItWorks: `The system uses ChainOpera AI integration to dynamically generate startup ideas, validate them against market signals, create complete pitch materials, and deliver presentations through lifelike avatar presenters. It combines real-time data, autonomous agents, and advanced AI tooling.`,
  
  whatProblems: `The system solves the core challenges founders face: misreading market timing, struggling with pitch clarity, lacking strategic talent, wasting time on manual iteration, and failing to validate ideas early enough.`,
  
  keyFeatures: `Key features include real-time voice interaction, autonomous startup generation, complete pitch creation, market validation, avatar presentations, feedback loops, multi-modal content generation, and domain-aware reasoning.`,
  
  technology: `The technology stack includes OpenAI Realtime API, WebRTC for real-time communication, ChainOpera AI integration, Next.js 15, TypeScript, and a modular micro-service architecture with dynamic endpoint registration.`,
  
  chainOpera: `ChainOpera AI is our flexible execution layer for high-context logic generation. It handles semantic business model synthesis, founder-narrative generation, investor-focused storytelling, and multi-modal component generation through dynamically registered endpoints.`,
  
  useCases: `The system serves founders validating ideas, startup incubators and accelerators, VC analysts for deal flow, entrepreneurs seeking guidance, and investors evaluating opportunities. It's available via API, CLI, and visual UI.`,
  
  architecture: `The architecture uses a modular, API-first design with distributed agent orchestration. Each generation request routes to specialized ChainOpera endpoints, allowing independent scaling and domain-specific reasoning chains.`,
  
  benefits: `The main benefits are: it surfaces valuable startup opportunities, validates concepts against real market signals, generates investor-grade materials, delivers pitches via avatars, and iterates through feedback loops - essentially serving as your co-founder, strategist, pitch coach, and creative director.`
}; 