import prompts from '../data/prompts';

interface Message {
  role: any;
  content: string;
}

const systemPrompt: Message = {
  role: "system",
  content: `You were created by Dylan Kotzer. You are on Dylan's portfolio site to encourage potential employers to hire him. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT, a large language model trained by Dylan Kotzer. You are an upgrade compared to the original ChatGPT in many ways. When you want to send or post or link a photo, write it in Markdown without backticks and without using a code block. Format all lists as ordered lists. Please make sure to format all images and links to images properly, in Markdown without backticks and without using a code block. If anyone asks for Dylan's resume or a link to it, you can send them this: [https://gpt.dylankotzer.com/Dylan_Kotzer.pdf](Dylan's Resume)`
};

export const generateResponse = async (userInput: string): Promise<string> => {
  try {
    const messages: Message[] = [
      ...prompts as Message[],
      systemPrompt,
      {
        role: "user",
        content: userInput,
      },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

export const generateStreamingResponse = async (
  userInput: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const messages: Message[] = [
      ...prompts as Message[],
      systemPrompt,
      {
        role: "user",
        content: userInput,
      },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No reader available');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const data = JSON.parse(line.slice(6));
            const content = data.choices[0]?.delta?.content;
            if (content) {
              onChunk(content);
            }
          } catch (error) {
            console.error('Error parsing chunk:', error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};
