import {Link} from "react-router-dom"

import './index.css'

const Header = () => (
    <header>
        <ul className="header-items">
            <li><Link to = "/" className="nav-link">TaskList</Link></li>
            <li><Link to ="/pie-chart" className="nav-link">Pie Chart</Link></li>
        </ul>
    </header>
)

export default Header