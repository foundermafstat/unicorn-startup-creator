import { NextRequest, NextResponse } from 'next/server'

const CHAINOPERA_API_URL = 'https://agent.chainopera.ai/api/v1/run/a699e3d6-0590-40c9-b068-f606619391bb?stream=false'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (!process.env.CHAINOPERA_API_KEY) {
      return NextResponse.json(
        { error: 'ChainOpera API key is not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(CHAINOPERA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CHAINOPERA_API_KEY,
      },
      body: JSON.stringify({
        input_value: prompt,
        output_type: "chat",
        input_type: "chat",
        tweaks: {
          "ChatInput-82uHT": {},
          "Prompt-SNvjy": {},
          "ChatOutput-7jNjU": {},
          "OpenAIModel-v4gHN": {}
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ChainOpera API error:', response.status, errorText)
      return NextResponse.json(
        { error: `ChainOpera API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
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
        content = data.output || data.response || data.content || ''
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
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
} 