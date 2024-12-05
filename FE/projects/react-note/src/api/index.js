import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
})

export async function fetchOpenAI(content) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: `다음 내용을 요약해줘 \n --- \n ${content}`,
            },
        ],
    })

    return completion.choices[0].message.content
}
