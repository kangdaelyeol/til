import Input from '../common/input'
import Panel, { PanelBody, PanelFooter, PanelHeader } from '../common/panel'
import QuestionBodyEditor from './question-body-editor'
import type Question from '../../models/question'
import { observer } from 'mobx-react-lite'
import QuestionTypeEditor from './question-type-editor'

import CopyIcon from '../../assets/icons/filter_none.svg?react'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import Divider from '../common/divider'
import Switch from '../common/switch'

interface Props {
    question: Question
    onCopy: (id: number) => void
    onDelete: (id: number) => void
}

const QuestionEditor = observer(function ({
    question,
    onCopy,
    onDelete,
}: Props) {
    return (
        <Panel className="border-l-[10px] border-l-transparent focus-within:border-l-main">
            <PanelHeader className="flex mb-[25px]">
                <Input
                    value={question.title}
                    onChange={(e) => question.setTitle(e.currentTarget.value)}
                    className="flex-1 mr-[30px]"
                />
                <QuestionTypeEditor
                    type={question.type}
                    onChange={question.setType}
                />
            </PanelHeader>
            <PanelBody>
                <QuestionBodyEditor type={question.type} />
            </PanelBody>
            <PanelFooter className="flex justify-end gap-x-[24px] h-[24px]">
                <button onClick={() => onCopy(question.id)}>
                    <CopyIcon />
                </button>
                <button>
                    <DeleteIcon onClick={() => onDelete(question.id)} />
                </button>
                <Divider direction="vertical" />
                <div className="flex items-center">
                    <span className="mr-[13px]">필수</span>
                    <Switch
                        id={`${question.id}_switch`}
                        checked={question.required}
                        onChange={question.setRequired}
                    />
                </div>
            </PanelFooter>
        </Panel>
    )
})

export default QuestionEditor
