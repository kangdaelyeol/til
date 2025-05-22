import express from 'express'
import JsonStorage from '../../utils/jsonStroage'
import path from 'path'
import type { SurveyResponse, Statistics, SectionData } from '../../types/app'
import { getStatistics } from '../../utils/statistics'

const router = express.Router()
const storage = new JsonStorage<{
    sections: SectionData[]
    emailCollected: boolean
    responses: SurveyResponse[]
}>(path.join(__dirname, '../data/surveys.json'))

router.get('/', (_, res) => {
    res.send(storage.getAll())
})

router.post('/', (req, res) => {
    const id = Date.now()
    storage.set(id, { ...req.body, emailCollected: false })
    res.json({ id })
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    storage.set(id, req.body)
    res.json({ id })
})

router.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = storage.get(id)

    storage.set(id, { ...data, ...req.body })
    res.json({ id })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = storage.get(id)

    if (!data) {
        res.status(404).json({ message: 'Not found' })
        return
    }

    res.json(data)
})

router.post('/:id/responses', (req, res) => {
    const id = Number(req.params.id)
    const data = storage.get(id)

    if (!data) {
        res.status(404).json({ message: 'Not found' })
        return
    }

    storage.set(id, {
        ...data,
        responses: [...(data.responses ?? []), req.body],
    })
    res.status(201).json({ message: 'Response added' })
    return
})

router.get('/:id/statistics', (req, res) => {
    const id = Number(req.params.id)
    const data = storage.get(id)

    if (!data) {
        res.status(404).json({ message: 'Not found' })
        return
    }
    const { responses, sections } = data

    const statistics: Statistics = getStatistics(responses, sections)

    res.json({ statistics, count: responses.length })
})

export default router
