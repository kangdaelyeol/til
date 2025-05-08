import { makeAutoObservable } from 'mobx'
import Question from './models/question'
import { createContext, useContext, type PropsWithChildren } from 'react'

class SurveyStore {
    questions: Question[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addQuestion() {
        this.questions.push(new Question())
    }

    removeQuestion(id: number) {
        this.questions = this.questions.filter((question) => question.id !== id)
    }

    copyQuestion(id: number) {
        const question = this.questions.find((question) => question.id === id)
        if (question) {
            this.questions.push(new Question({ ...question, id: Date.now() }))
        }
    }
}

const surveyStore = new SurveyStore()

const SurveyStoreContext = createContext(surveyStore)


// eslint-disable-next-line react-refresh/only-export-components
export const useSurveyStore = () => useContext(SurveyStoreContext)
export const SurveyStoreProvider = ({ children }: PropsWithChildren) => (
    <SurveyStoreContext.Provider value={surveyStore}>
        {children}
    </SurveyStoreContext.Provider>
)
