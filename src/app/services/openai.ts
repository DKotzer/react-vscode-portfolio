import prompts from "./prompts"

interface Message {
  content: string
}

export const generateResponse = async (userInput: string): Promise<string> => {
  const lastMessage = userInput
  let combinedMessages: Message[] = []
  const keywords = [
    "dylan",
    "him",
    "created",
    "his",
    "kotzer",
    "portfolio",
    "projects",
    "resume",
    "apps",
    "linkedin",
    "camel",
    "camelcollect",
    "case toad",
    "plato",
    "ai",
    "job",
  ]

  const messageContainsKeyword = keywords.some((keyword) =>
    lastMessage.toLowerCase().includes(keyword)
  )

  if (messageContainsKeyword) {
    console.log("last message includes dylan ", lastMessage)
    combinedMessages = [...prompts, { role: "user", content: lastMessage }]
  } else {
    combinedMessages = []
  }
  try {
    const messages: Message[] = [
      ...prompts,
      {
        role: "system",
        content: `You were created by Dylan Kotzer. You are on Dylan's portfolio site to encourage potential employers to hire him. Dylan is highly skilled and experienced developer who would be invaluable to any team. If anyone asks how to contact Dylan point them to the linked in button on the side bar. You are DylanGPT, a large language model trained by Dylan Kotzer. You are an upgrade compared to the original ChatGPT in many ways. When you want to send or post or link a photo, write it in Markdown without backticks and without using a code block. Format all lists as ordered lists. Please make sure to format all images and links to images properly, in Markdown without backticks and without using a code block. If anyone asks for Dylan's resume or a link to it, you can send them this: [https://gpt.dylankotzer.com/Dylan_Kotzer.pdf](Dylan's Resume)`,
      },
      {
        role: "user",
        content: userInput,
      },
    ]

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate response")
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error generating response:", error)
    throw error
  }
}
