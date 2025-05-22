import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MainLayout from './components/common/main-layout'
import { SurveyStoreProvider } from './store'
import AdminPage from './pages/admin-page'
import CreatePage from './pages/create-page'
import EditPage from './pages/edit-page'
import FormPage from './pages/form-page'
import CompletePage from './pages/complete-page'
import StatisticsPage from './pages/statistics-page'

function App() {
    return (
        <BrowserRouter
            future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true,
            }}
        >
            <MainLayout>
                <SurveyStoreProvider>
                    <Routes>
                        <Route path="/survey/new" element={<CreatePage />} />
                        <Route
                            path="/survey/:surveyId"
                            element={<FormPage />}
                        />
                        <Route path="/survey/:surveyId" element={<AdminPage />}>
                            <Route path="edit" element={<EditPage />} />
                            <Route
                                path="responses"
                                element={<StatisticsPage />}
                            />
                        </Route>
                        <Route
                            path="/survey/:surveyId/complete"
                            element={<CompletePage />}
                        />
                    </Routes>
                </SurveyStoreProvider>
            </MainLayout>
        </BrowserRouter>
    )
}

export default App
