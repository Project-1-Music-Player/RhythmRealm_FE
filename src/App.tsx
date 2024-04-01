import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

import { publicRoutes } from './routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component
                    let Layout = DefaultLayout
                    
                    if(route.layout) {
                        Layout = route.layout
                    }

                    return (
                        <Route 
                            key={index} 
                            path={route.path} 
                            element={<Layout>
                                {<Page/>}
                            </Layout>}
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default App;
