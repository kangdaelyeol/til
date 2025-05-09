import { makeAutoObservable } from 'mobx'
import { createContext, useContext, type PropsWithChildren } from 'react'
import Section, { type SectionData } from './models/section'
import callApi from './utils/api'

class SurveyStore {
    sections: Section[]
    focusedSectionId: number | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })

        this.sections = [new Section()]
        this.focusedSectionId = this.sections[0].id
    }

    addSection() {
        const section = new Section()
        this.sections.push(section)
        this.focusedSectionId = section.id
    }

    addQuestion() {
        const section = this.sections.find(
            (section) => section.id === this.focusedSectionId,
        )

        if (section) {
            section.addQuestion()
        }
    }

    setFocusedSectionId(id: number) {
        this.focusedSectionId = id
    }

    fetchSurvey(id: number) {
        callApi<{ sections: SectionData[] }>(`/survey/${id}`).then(
            ({ sections }) => {
                this.sections = sections.map((section) => new Section(section))
            },
        )
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
