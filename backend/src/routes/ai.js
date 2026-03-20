import { Router } from 'express'
import openai from '../lib/openai.js'
import prisma from '../lib/prisma.js'

const router = Router()

router.post('/chat', async (req, res) => {
  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' })
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  })

  const responseText = completion.choices[0].message.content

  const conversation = await prisma.conversation.create({
    data: { prompt, response: responseText },
  })

  res.json({ id: conversation.id, response: responseText })
})

export default router
