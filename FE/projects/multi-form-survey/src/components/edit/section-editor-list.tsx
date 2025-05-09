import { useSurveyStore } from '../../store'
import EditorMenu from './editor-menu'
import SectionEditor from './section-editor'

export default function SectionEditorList() {
    const surveyStore = useSurveyStore()

    return (
        <div className="relative">
            <EditorMenu className="fixed bottom-[30px] left-[calc(100%-72px)] xs:top-[263px] xs:left-[calc(50%+340px)] xs:bottom-auto" />
            <div>
                {surveyStore.sections.map((section) => (
                    <SectionEditor key={section.id} section={section} />
                ))}
            </div>
        </div>
    )
}
