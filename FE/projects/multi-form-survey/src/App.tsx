import './App.css'
import Dropdown from './components/common/dropdown'
import MainLayout from './components/common/main-layout'
import Panel, {
    PanelBody,
    PanelCap,
    PanelFooter,
    PanelHeader,
} from './components/common/panel'
import Tabs, {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
} from './components/common/tabs'
import QuestionEditor from './components/edit/question-editor'

function App() {
    return (
        <MainLayout>
            <Tabs>
                <TabList>
                    <Tab index={0}>tab1</Tab>
                    <Tab index={1}>tab2</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel index={0}>
                        <QuestionEditor />
                    </TabPanel>
                    <TabPanel index={1}>panel2</TabPanel>
                </TabPanels>
            </Tabs>
        </MainLayout>
    )
}

export default App
