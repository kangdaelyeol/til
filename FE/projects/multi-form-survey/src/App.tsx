import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './components/common/main-layout'
import SectionEditorList from './components/edit/section-editor-list'
import { SurveyStoreProvider } from './store'
import AdminPage from './pages/admin-page'

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <SurveyStoreProvider>
                    <Routes>
                        <Route
                            path="/surveys/:surveyId"
                            element={<AdminPage />}
                        >
                            <Route
                                path="edit"
                                element={<SectionEditorList />}
                            />
                            <Route path="responses" element={<div>응답</div>} />
                        </Route>
                    </Routes>
                </SurveyStoreProvider>
            </MainLayout>
        </BrowserRouter>
    )
}

export default App
