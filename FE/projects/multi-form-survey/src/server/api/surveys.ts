import express from 'express'
import JsonStorage from '../../utils/jsonStroage'
import path from 'path'
import type { SectionData } from '../../models/section'

const router = express.Router()
const storage = new JsonStorage<{
    sections: SectionData[]
    emailCollected: boolean
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

export default router
