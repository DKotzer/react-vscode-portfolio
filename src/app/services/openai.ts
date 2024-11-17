export const generateStreamingResponse = async (
  userInput: string,
  onChunk: (chunk: string) => void
): Promise<void> => {
  try {
    const response = await fetch(
      "http://ai-backend-git-main-dkotzer-s-team.vercel.app/api/openai/stream",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to generate response")
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error("No reader available")
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      try {
        let resultBuffer = ""
        const lines = chunk.split("\n")
        for (const line of lines) {
          if (line.trim() && line.startsWith("data: ")) {
            const dataResponse = JSON.parse(line.slice(6))
            if (dataResponse.response) {
              resultBuffer += dataResponse.response
              onChunk(resultBuffer)
              resultBuffer = ""
            }
          }
        }
      } catch (error) {
        console.error("Error parsing chunk:", error)
      }
    }
  } catch (error) {
    console.error("Error generating response:", error)
    throw error
  }
}