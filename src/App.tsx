import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes';
import DefaultLayout from './layout/DefaultLayout';

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout
                        return (
                            <Route 
                                key={index} 
                                path={route.path} 
                                element={<Layout>
                                    {<route.component/>}
                                </Layout>}
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App;
