import type Section from '../../models/section'
import Panel, { PanelBody, PanelCap } from '../common/panel'

interface Props {
    capTitle: string
    section: Section
}

export default function SectionTitleEditor({ capTitle, section }: Props) {
    return (
        <div>
            <PanelCap>{capTitle}</PanelCap>
            <Panel>
                <PanelBody className="flex flex-col">
                    <h4 className="mb-[17px] text-[24px] font-semibold text-gray900">
                        {section.title}
                    </h4>
                    <p className="text-[16px] text-gray700">
                        {section.description}
                    </p>
                </PanelBody>
            </Panel>
        </div>
    )
}
