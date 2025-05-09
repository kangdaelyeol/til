import { observer } from 'mobx-react-lite'
import { useSurveyStore } from '../../store'
import EditorMenu from './editor-menu'
import SectionEditor from './section-editor'

const SectionEditorList = observer(function () {
    const surveyStore = useSurveyStore()

    return (
        <div className="relative">
            <EditorMenu className="fixed bottom-[30px] left-[calc(100%-72px)] xs:top-[263px] xs:left-[calc(50%+340px)] xs:bottom-auto" />
            <div>
                {surveyStore.sections.map((section, index) => (
                    <SectionEditor
                        key={section.id}
                        section={section}
                        capTitle={`${surveyStore.sections.length}개 중 ${
                            index + 1
                        }섹션`}
                        onChangeFocus={surveyStore.setFocusedSectionId}
                    />
                ))}
            </div>
        </div>
    )
})

export default SectionEditorList
