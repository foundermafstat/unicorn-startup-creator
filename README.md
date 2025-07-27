# Unicorn Startup Creator - OpenAI Realtime API Next.js Application

A cutting-edge AI-powered application that leverages OpenAI's Realtime API with WebRTC technology to create an interactive voice-controlled startup creation and presentation platform.

## 🚀 Overview

This project demonstrates the integration of OpenAI's latest Realtime API with WebRTC for real-time voice interactions, enabling users to create, manage, and present startup ideas through natural voice commands and AI assistance.

## 🏗️ Project Structure

```
openai-realtime-api-nextjs/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   ├── generate-project-content/  # Project content generation
│   │   └── session/              # OpenAI Realtime session management
│   ├── about/                    # About page
│   ├── features/                 # Features showcase
│   ├── presentations/            # Presentation management
│   ├── project-generator/        # Startup project generator
│   └── settings/                 # Application settings
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── broadcast-interface.tsx   # Main voice interface
│   ├── presentation-viewer.tsx   # Presentation display
│   └── voice-navigation-demo.tsx # Voice navigation demo
├── contexts/                     # React contexts
│   ├── presentation-context.tsx  # Presentation state management
│   └── presentation-control-context.tsx # Presentation controls
├── hooks/                        # Custom React hooks
│   ├── use-webrtc.ts            # WebRTC session management
│   ├── use-tools.ts             # AI tools implementation
│   └── use-broadcast-context.tsx # Broadcast context hook
├── lib/                         # Utility libraries
│   ├── tools.ts                 # Tool definitions for AI
│   ├── conversations.ts         # Conversation management
│   └── translations/            # Multi-language support
└── types/                       # TypeScript type definitions
```

## 🛠️ Technical Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library

### AI & Voice Technologies
- **OpenAI Realtime API** - Real-time AI interactions
- **WebRTC** - Real-time communication
- **Whisper-1** - Speech-to-text transcription
- **TTS (Text-to-Speech)** - AI voice synthesis

### Additional Libraries
- **Framer Motion** - Animation library
- **Canvas Confetti** - Visual effects
- **Firecrawl** - Web scraping capabilities
- **Swiper** - Touch slider for presentations
- **Sonner** - Toast notifications

## 🎯 Key Features

### 1. Real-Time Voice Interaction
- **WebRTC Integration**: Direct peer-to-peer communication with OpenAI
- **Low Latency**: Sub-second response times for voice interactions
- **Multi-Voice Support**: Multiple AI voice options (alloy, echo, fable, onyx, nova, shimmer)
- **Speech Recognition**: Real-time transcription with Whisper-1

### 2. AI-Powered Tools
The application includes a comprehensive set of AI tools that can be triggered via voice commands:

#### Navigation Tools
- `navigateToPage` - Navigate between application pages
- `launchWebsite` - Open external websites
- `copyToClipboard` - Copy text to clipboard

#### Presentation Controls
- `nextSlide` / `previousSlide` - Navigate presentation slides
- `goToSlideNumber` - Jump to specific slide
- `firstSlide` / `lastSlide` - Navigate to presentation boundaries
- `togglePause` - Pause/resume presentation
- `toggleFullscreen` - Toggle fullscreen mode
- `exitPresentation` - Exit presentation mode
- `narrateSlide` - AI narration of current slide

#### Utility Tools
- `getCurrentTime` - Get current time and timezone
- `changeBackgroundColor` - Toggle dark/light theme
- `partyMode` - Trigger confetti animation
- `scrapeWebsite` - Extract content from web pages

### 3. Presentation System
- **Dynamic Content**: AI-generated presentation content
- **Voice Navigation**: Complete presentation control via voice
- **Real-time Updates**: Live content generation and updates
- **Multi-format Support**: Markdown and HTML content rendering

### 4. Internationalization
- **Multi-language Support**: English, Spanish, French, Russian, Chinese
- **Dynamic Language Switching**: Real-time language changes
- **Localized UI**: Complete interface translation

### 5. Project Generation
- **AI Content Creation**: Generate startup documentation
- **Structured Output**: Technical details, business models, problem solutions
- **Real-time Generation**: Instant content creation via AI

## 🔌 ChainOpera AI Integration

### What is ChainOpera AI?

ChainOpera AI represents the next generation of AI-powered applications that combine real-time voice interaction, intelligent tool execution, and dynamic content generation. Our application serves as a comprehensive implementation of ChainOpera AI principles, demonstrating how AI can orchestrate complex workflows through natural language commands.

### Current ChainOpera AI Implementation

#### 1. **Real-Time Voice Orchestration**
Our application implements ChainOpera AI's core principle of real-time voice-driven orchestration:

```typescript
// ChainOpera AI Session Management
POST /api/session
{
  model: "gpt-4o-realtime-preview-2024-12-17",
  voice: "alloy",
  modalities: ["audio", "text"],
  instructions: "Start conversation with the user by saying 'Hello, how can I help you today?' Use the available tools when relevant. After executing a tool, you will need to respond (create a subsequent conversation item) to the user sharing the function result or error. If you do not respond with additional message with function result, user will not know you successfully executed the tool. Speak and respond in the language of the user.",
  tool_choice: "auto",
}
```

#### 2. **Intelligent Tool Chain Execution**
ChainOpera AI orchestrates complex workflows through intelligent tool chaining:

```typescript
// Tool Registration System
const functionRegistry = useRef<Record<string, Function>>({});

function registerFunction(name: string, fn: Function) {
  functionRegistry.current[name] = fn;
}

// Dynamic Tool Execution
case "response.function_call_arguments.done": {
  const fn = functionRegistry.current[msg.name];
  const args = JSON.parse(msg.arguments);
  const result = await fn(args);
  
  // ChainOpera AI Response Pattern
  const response = {
    type: "conversation.item.create",
    item: {
      type: "function_call_output",
      call_id: msg.call_id,
      output: JSON.stringify(result),
    },
  };
  dataChannelRef.current?.send(JSON.stringify(response));
}
```

#### 3. **Multi-Modal Communication Channels**
ChainOpera AI supports multiple communication modalities:

- **Voice-to-Voice**: Real-time speech interaction
- **Voice-to-Text**: Speech transcription and processing
- **Text-to-Voice**: AI response synthesis
- **Tool-to-AI**: Function execution feedback
- **AI-to-UI**: Dynamic interface updates

#### 4. **Intelligent Context Management**
ChainOpera AI maintains context across multiple interaction layers:

```typescript
// Context-Aware Session Configuration
function configureDataChannel(dataChannel: RTCDataChannel) {
  const sessionUpdate = {
    type: "session.update",
    session: {
      modalities: ["text", "audio"],
      tools: tools || [],
      input_audio_transcription: {
        model: "whisper-1",
      },
    },
  };
  
  // Language-Aware Context
  const languageMessage = {
    type: "conversation.item.create",
    item: {
      type: "message",
      role: "user",
      content: [
        {
          type: "input_text",
          text: t("languagePrompt"),
        },
      ],
    },
  };
}
```

### ChainOpera AI Architecture Components

#### 1. **Session Orchestrator**
- **Ephemeral Token Management**: Secure session creation and management
- **WebRTC Connection**: Real-time peer-to-peer communication
- **State Synchronization**: Consistent state across all components

#### 2. **Tool Execution Engine**
- **Dynamic Function Registry**: Runtime tool registration and discovery
- **Parameter Validation**: Type-safe parameter handling
- **Error Recovery**: Graceful error handling and user feedback
- **Result Processing**: Structured response formatting

#### 3. **Communication Protocol**
ChainOpera AI implements a sophisticated message protocol:

```typescript
// Input Processing Pipeline
const messageTypes = {
  // Speech Detection
  "input_audio_buffer.speech_started": "User begins speaking",
  "input_audio_buffer.speech_stopped": "User stops speaking", 
  "input_audio_buffer.committed": "Speech processing",
  
  // Transcription Pipeline
  "conversation.item.input_audio_transcription": "Partial transcription",
  "conversation.item.input_audio_transcription.completed": "Final transcription",
  
  // AI Response Pipeline
  "response.audio_transcript.delta": "Streaming AI response",
  "response.audio_transcript.done": "Response completion",
  
  // Tool Execution Pipeline
  "response.function_call_arguments.done": "Tool execution request"
};
```

#### 4. **Presentation Orchestration**
ChainOpera AI includes specialized presentation management:

```typescript
// Presentation Control Tools
const presentationTools = {
  nextSlide: "Navigate to next slide",
  previousSlide: "Navigate to previous slide", 
  goToSlideNumber: "Jump to specific slide",
  firstSlide: "Navigate to first slide",
  lastSlide: "Navigate to last slide",
  togglePause: "Pause/resume presentation",
  toggleFullscreen: "Toggle fullscreen mode",
  exitPresentation: "Exit presentation mode",
  narrateSlide: "AI narration of current slide"
};
```

### Planned ChainOpera AI Enhancements

#### 1. **Advanced Workflow Orchestration**
- **Multi-Step Tool Chains**: Complex workflows with conditional logic
- **Parallel Execution**: Concurrent tool execution for improved performance
- **Workflow Templates**: Predefined workflow patterns for common tasks
- **Error Recovery Chains**: Automatic error handling and recovery

#### 2. **Enhanced AI Capabilities**
- **Context Memory**: Long-term conversation memory and learning
- **Personalization**: User-specific AI behavior adaptation
- **Multi-Agent Coordination**: Multiple AI agents working together
- **Predictive Actions**: Proactive tool suggestions based on context

#### 3. **Advanced Integration Features**
- **External API Orchestration**: Seamless integration with third-party services
- **Database Operations**: Direct database querying and manipulation
- **File System Operations**: File creation, modification, and management
- **Real-time Collaboration**: Multi-user collaborative sessions

#### 4. **Intelligent Content Generation**
- **Dynamic Presentation Creation**: AI-generated presentations from voice commands
- **Content Adaptation**: Real-time content modification based on user feedback
- **Multi-format Output**: Support for various content formats (PDF, PPTX, HTML)
- **Brand Integration**: Customizable branding and styling

#### 5. **Advanced Analytics and Monitoring**
- **Usage Analytics**: Detailed usage patterns and insights
- **Performance Monitoring**: Real-time performance metrics
- **Quality Assurance**: Automated quality checks and improvements
- **A/B Testing**: Experimental feature testing and optimization

#### 6. **Enterprise Features**
- **Role-Based Access Control**: Granular permission management
- **Audit Logging**: Comprehensive activity logging and compliance
- **Integration APIs**: RESTful APIs for enterprise integration
- **Custom Tool Development**: Framework for custom tool creation

### ChainOpera AI Development Roadmap

#### Phase 1: Foundation (Current)
- ✅ Real-time voice interaction
- ✅ Basic tool execution
- ✅ Presentation management
- ✅ Multi-language support

#### Phase 2: Enhancement (Q2 2024)
- 🔄 Advanced workflow orchestration
- 🔄 Enhanced AI capabilities
- 🔄 External API integration
- 🔄 Performance optimization

#### Phase 3: Enterprise (Q3 2024)
- 📋 Enterprise security features
- 📋 Advanced analytics
- 📋 Custom tool framework
- 📋 Multi-tenant support

#### Phase 4: Innovation (Q4 2024)
- 📋 AI agent coordination
- 📋 Predictive capabilities
- 📋 Advanced content generation
- 📋 Real-time collaboration

### ChainOpera AI Technical Specifications

#### Performance Targets
- **Latency**: < 500ms voice-to-voice response time
- **Throughput**: Support for 1000+ concurrent sessions
- **Reliability**: 99.9% uptime with automatic failover
- **Scalability**: Horizontal scaling with load balancing

#### Security Standards
- **Encryption**: End-to-end encryption for all communications
- **Authentication**: Multi-factor authentication support
- **Compliance**: GDPR, SOC 2, and HIPAA compliance ready
- **Audit**: Comprehensive audit trail for all operations

#### Integration Capabilities
- **APIs**: RESTful APIs for external integrations
- **Webhooks**: Real-time event notifications
- **SDKs**: Client libraries for multiple programming languages
- **Plugins**: Extensible plugin architecture for custom functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- OpenAI API key with Realtime API access

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/foundermafstat/unicorn-startup-creator.git
cd unicorn-startup-creator
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

4. **Run the development server**
```bash
pnpm dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🎮 Usage

### Voice Commands
The AI understands natural language commands for all available tools:

- **"Navigate to the about page"** - Changes page
- **"Go to the next slide"** - Presentation navigation
- **"What time is it?"** - Get current time
- **"Launch Google"** - Open external website
- **"Copy this text to clipboard"** - Clipboard operations
- **"Scrape this website"** - Web content extraction

### Presentation Mode
1. Start a voice session
2. Say "Create a presentation about [topic]"
3. Use voice commands to navigate slides
4. Ask AI to narrate content
5. Control playback with voice commands

## 🔧 Configuration

### Voice Settings
Configure AI voice parameters in the settings:
- Voice selection (alloy, echo, fable, onyx, nova, shimmer)
- Language preferences
- Audio quality settings

### Tool Customization
Add new tools by:
1. Defining tool schema in `lib/tools.ts`
2. Implementing function in `hooks/use-tools.ts`
3. Registering function in broadcast context

### Styling
- **Theme**: Dark/light mode support
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG compliant components

## 🧪 Testing

### Development Testing
```bash
# Run linting
pnpm lint

# Type checking
pnpm type-check

# Build for production
pnpm build
```

### Voice Testing
1. Use browser's developer tools to monitor WebRTC connections
2. Check console for function call logs
3. Test tool execution with various inputs
4. Verify multi-language support

## 📊 Performance

### Optimization Features
- **Turbopack**: Fast development builds
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in optimization
- **Bundle Analysis**: Production bundle monitoring

### Monitoring
- **Real-time Metrics**: Connection status and latency
- **Error Tracking**: Comprehensive error logging
- **Performance Monitoring**: WebRTC connection quality

## 🔒 Security

### Data Protection
- **Ephemeral Sessions**: Temporary session tokens
- **Secure WebRTC**: Encrypted peer-to-peer communication
- **API Key Protection**: Server-side key management
- **Input Validation**: Comprehensive input sanitization

### Privacy
- **Local Processing**: Audio processing on client-side
- **No Data Storage**: Conversations not persisted
- **Secure Transmission**: All data encrypted in transit

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for the Realtime API
- **Vercel** for hosting and deployment
- **shadcn/ui** for the component library
- **Next.js Team** for the amazing framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/foundermafstat/unicorn-startup-creator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/foundermafstat/unicorn-startup-creator/discussions)
- **Documentation**: [Project Wiki](https://github.com/foundermafstat/unicorn-startup-creator/wiki)

---

**Built with ❤️ using Next.js 15, OpenAI Realtime API, and WebRTC** 