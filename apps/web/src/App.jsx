import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoutes from './routes/PrivateRoutes'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/in/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  )
}

export default App;
