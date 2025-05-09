import { observer } from 'mobx-react-lite'
import type Section from '../../models/section'
import Input from '../common/input'
import Panel, { PanelBody, PanelCap } from '../common/panel'

interface Props {
    capTitle: string
    section: Section
}

const SectionTitleEditor = observer(function ({ capTitle, section }: Props) {
    return (
        <div>
            <PanelCap>{capTitle}</PanelCap>
            <Panel>
                <PanelBody className="flex flex-col">
                    <Input
                        className="mb-[17px] text-[24px] font-semibold text-gray900 py-[8px]"
                        value={section.title}
                        onChange={(e) =>
                            section.setTitle(e.currentTarget.value)
                        }
                    />
                    <Input
                        className="text-[16px] text-gray700"
                        value={section.description}
                        onChange={(e) =>
                            section.setDescription(e.currentTarget.value)
                        }
                    />
                </PanelBody>
            </Panel>
        </div>
    )
})

export default SectionTitleEditor
