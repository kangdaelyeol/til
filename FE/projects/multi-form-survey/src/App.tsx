import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './components/common/main-layout'
import { SurveyStoreProvider } from './store'
import AdminPage from './pages/admin-page'
import CreatePage from './pages/create-page'
import EditPage from './pages/edit-page'

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <SurveyStoreProvider>
                    <Routes>
                        <Route
                            path="/survey/new"
                            element={<CreatePage />}
                        ></Route>
                        <Route path="/survey/:surveyId" element={<AdminPage />}>
                            <Route path="edit" element={<EditPage />} />
                            <Route path="responses" element={<div>응답</div>} />
                        </Route>
                    </Routes>
                </SurveyStoreProvider>
            </MainLayout>
        </BrowserRouter>
    )
}

export default App
