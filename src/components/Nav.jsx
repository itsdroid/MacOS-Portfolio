import '../Nav.css';
import DateTime from './DateTime';

export default function () {
    return (
        <nav>
            <div className='nav-container'>
                <div className="left">
                    <div className="nav-item apple-item">
                        <img className='apple-icon' src='/navbar-icons/apple.svg' alt='apple-logo' />
                    </div>
                    <h4 className="nav-item app-title">Shubh</h4>
                    <h4 className="nav-item">File</h4>
                    <h4 className="nav-item">Window</h4>
                    <h4 className="nav-item">Terminal</h4>
                </div>

                <div className="right">
                    <div className="nav-item nav-icon-item">
                        <img className="nav-icon" src='/navbar-icons/battery.svg' alt='battery-icon' />
                    </div>
                    <div className="nav-item nav-icon-item">
                        <img className="nav-icon" src='/navbar-icons/wifi.svg' alt='wifi-icon' />
                    </div>
                    <div className="nav-item nav-icon-item">
                        <img className="nav-icon" src='/navbar-icons/search.svg' alt='search-icon' />
                    </div>
                    <div className="nav-item nav-icon-item">
                        <img className="nav-icon" src='/navbar-icons/control-center.svg' alt='control-center-icon' />
                    </div>
                    <div className="nav-item nav-date">
                        <DateTime />
                    </div>
                </div>
            </div>
        </nav>
    );
}
