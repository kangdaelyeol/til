import type { QuestionType } from '../../types/app'
import Input from '../common/input'
import OptionEditor from './option-editor'

interface QuestionBodyEditorProps {
    type: QuestionType
}

export default function QuestionBodyEditor({ type }: QuestionBodyEditorProps) {
    switch (type) {
        case 'shortText':
        case 'longText':
        case 'date':
        case 'time':
            return <Input disabled />
        case 'multipleChoice':
        case 'checkbox':
        case 'dropdown':
            return <OptionEditor type={type} />
        default:
            return null
    }
}
