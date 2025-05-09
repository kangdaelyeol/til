import './App.css'
import MainLayout from './components/common/main-layout'
import Tabs, {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
} from './components/common/tabs'
import SectionEditorList from './components/edit/section-editor-list'
import { SurveyStoreProvider } from './store'

function App() {
    return (
        <MainLayout>
            <SurveyStoreProvider>
                <Tabs>
                    <TabList>
                        <Tab index={0}>tab1</Tab>
                        <Tab index={1}>tab2</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel index={0}>
                            <SectionEditorList />
                        </TabPanel>
                        <TabPanel index={1}>panel2</TabPanel>
                    </TabPanels>
                </Tabs>
            </SurveyStoreProvider>
        </MainLayout>
    )
}

export default App
