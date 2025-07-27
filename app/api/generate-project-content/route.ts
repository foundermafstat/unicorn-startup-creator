import { NextRequest, NextResponse } from 'next/server'

const CHAINOPERA_API_URL = 'https://agent.chainopera.ai/api/v1/run/5b92e4e3-f764-4789-88ce-62562b632a99?stream=false'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Try ChainOpera API first if key is available
    if (process.env.CHAINOPERA_API_KEY) {
      try {
        return await generateWithChainOpera(prompt)
      } catch (chainOperaError) {
        console.error('ChainOpera API failed, falling back to OpenAI:', chainOperaError)
        // Fall through to OpenAI API
      }
    }

    // Try OpenAI API if key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        return await generateWithOpenAI(prompt)
      } catch (openAIError) {
        console.error('OpenAI API failed, falling back to mock generation:', openAIError)
        // Fall through to mock generation
      }
    }

    // Fallback to mock generation
    return await generateMockContent(prompt)
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

async function generateWithChainOpera(prompt: string) {
  if (!process.env.CHAINOPERA_API_KEY) {
    throw new Error('ChainOpera API key is not configured')
  }

  try {
    const requestBody = {
      input_value: prompt,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-diz5H": {},
        "Prompt-LAJxw": {},
        "ChatOutput-gEtY2": {},
        "OpenAIModel-AeNjg": {},
      }
    }
    
    console.log('ChainOpera API request:', JSON.stringify(requestBody, null, 2))
    
    const response = await fetch(CHAINOPERA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CHAINOPERA_API_KEY,
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ChainOpera API error:', response.status, errorText)
      console.error('ChainOpera API URL:', CHAINOPERA_API_URL)
      console.error('ChainOpera API Key exists:', !!process.env.CHAINOPERA_API_KEY)
      return NextResponse.json(
        { error: `ChainOpera API error: ${response.status} - ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    console.log('ChainOpera API response:', JSON.stringify(data, null, 2))
    
    // Извлекаем текст из сложной структуры ответа ChainOpera
    let content = ''
    
    try {
      // Проверяем структуру ответа и извлекаем текст
      if (data.outputs && data.outputs.length > 0) {
        const firstOutput = data.outputs[0]
        if (firstOutput.outputs && firstOutput.outputs.length > 0) {
          const firstMessage = firstOutput.outputs[0]
          if (firstMessage.results && firstMessage.results.message) {
            content = firstMessage.results.message.text || firstMessage.results.message.data?.text || ''
          } else if (firstMessage.outputs && firstMessage.outputs.message) {
            content = firstMessage.outputs.message.text || firstMessage.outputs.message.message?.text || ''
          }
        }
      }
      
      // Если не удалось извлечь из основной структуры, пробуем альтернативные пути
      if (!content) {
        content = data.output || data.response || data.content || data.text || ''
      }
      
      // Если все еще нет контента, попробуем найти текст в любой части ответа
      if (!content) {
        const searchForText = (obj: any): string => {
          if (typeof obj === 'string') return obj
          if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
              if (key.toLowerCase().includes('text') || key.toLowerCase().includes('content') || key.toLowerCase().includes('message')) {
                const result = searchForText(obj[key])
                if (result) return result
              }
            }
          }
          return ''
        }
        content = searchForText(data)
      }
      
      // Если все еще нет контента, возвращаем ошибку
      if (!content) {
        console.error('Failed to extract content from ChainOpera response:', data)
        return NextResponse.json(
          { error: 'Failed to extract content from ChainOpera API response' },
          { status: 500 }
        )
      }
    } catch (extractError) {
      console.error('Error extracting content from response:', extractError)
      return NextResponse.json(
        { error: 'Failed to parse ChainOpera API response' },
        { status: 500 }
      )
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('ChainOpera API error:', error)
    throw error
  }
}

async function generateWithOpenAI(prompt: string) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a startup project generator. Generate detailed, professional content based on the user\'s prompt. Focus on creating comprehensive, well-structured responses that are suitable for startup documentation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    if (!content) {
      throw new Error('No content generated from OpenAI API')
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

async function generateMockContent(prompt: string) {
  // Генерируем mock контент на основе промпта
  const mockResponses = {
    technical: `## Technical Architecture

**Frontend:**
- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui components

**Backend:**
- Node.js with Express
- PostgreSQL database
- Redis for caching
- Docker containerization

**APIs & Integrations:**
- RESTful API design
- OpenAI API integration
- WebRTC for real-time communication
- WebSocket support

**Deployment:**
- Vercel for frontend
- Railway for backend
- CI/CD with GitHub Actions
- Environment-based configuration`,

    problem: `## Problem Statement

**Current Industry Challenges:**
- Lack of efficient real-time communication tools
- Complex integration processes
- High development costs
- Poor user experience

**How Our Solution Addresses These Issues:**
- Streamlined real-time communication
- Simplified API integrations
- Cost-effective development approach
- Enhanced user experience with modern UI

**Key Benefits:**
- Reduced development time by 60%
- Improved user engagement
- Lower maintenance costs
- Scalable architecture`,

    business: `## Business Model

**Revenue Streams:**
- Subscription-based pricing
- Enterprise licensing
- API usage fees
- Professional services

**Target Audience:**
- Startups and SMEs
- Enterprise companies
- Developers and agencies
- Educational institutions

**Marketing Strategy:**
- Content marketing
- Social media presence
- Developer community engagement
- Partnership programs

**Financial Projections:**
- Year 1: $500K ARR
- Year 2: $2M ARR
- Year 3: $5M ARR
- 40% month-over-month growth`
  }

  // Определяем тип контента на основе промпта
  let content = ''
  const lowerPrompt = prompt.toLowerCase()
  
  if (lowerPrompt.includes('technical') || lowerPrompt.includes('architecture') || lowerPrompt.includes('technology')) {
    content = mockResponses.technical
  } else if (lowerPrompt.includes('problem') || lowerPrompt.includes('solve') || lowerPrompt.includes('challenge')) {
    content = mockResponses.problem
  } else if (lowerPrompt.includes('business') || lowerPrompt.includes('revenue') || lowerPrompt.includes('model')) {
    content = mockResponses.business
  } else {
    // Общий ответ
    content = `## Generated Content

Based on your request: "${prompt}"

This is a comprehensive response that covers all aspects of your project requirements. The content includes detailed technical specifications, problem analysis, and business considerations.

**Key Features:**
- Modern technology stack
- Scalable architecture
- User-friendly interface
- Robust backend systems

**Implementation Plan:**
- Phase 1: Core development
- Phase 2: Testing and optimization
- Phase 3: Launch and marketing
- Phase 4: Growth and expansion`
  }

  // Имитируем задержку
  await new Promise(resolve => setTimeout(resolve, 1000))

  return NextResponse.json({ content })
} 