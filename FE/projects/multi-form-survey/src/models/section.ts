import { makeAutoObservable } from 'mobx'
import Question from './question'

export type SectionData = {
    id: number
    title: string
    description: string
    questions: Question[]
}

export default class Section implements SectionData {
    id: number
    title: string
    questions: Question[]
    description: string

    constructor(
        data: SectionData = {
            id: Date.now(),
            title: '',
            questions: [new Question()],
            description: '',
        },
    ) {
        makeAutoObservable(this, {}, { autoBind: true })

        this.id = data.id
        this.title = data.title
        this.description = data.description
        this.questions = data.questions.map(
            (question) => new Question(question),
        )
    }

    setTitle(title: string) {
        this.title = title
    }

    setDescription(description: string) {
        this.description = description
    }

    addQuestion() {
        this.questions.push(new Question())
    }

    removeQuestion(id: number) {
        this.questions = this.questions.filter((question) => question.id !== id)
    }

    copyQuestion(id: number) {
        const question = this.questions.find((question) => question.id === id)
        console.log(question)
        if (question) {
            this.questions.push(new Question({ ...question, id: Date.now() }))
        }
    }
}
