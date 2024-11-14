import { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function sendMessages(messages: OpenAI.ChatCompletionMessageParam[]) {
    const chatCompletion = await openai.chat.completions.create({
        messages,
        model: 'gpt-4o-mini-2024-07-18',
    })

    return chatCompletion.choices[0].message
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { messages } = JSON.parse(req.body)

    const message = await sendMessages(messages)
    res.status(200).json(message)
}
