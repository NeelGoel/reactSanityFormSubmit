import style from './dashboard.module.css';
import { slide as Menu } from 'react-burger-menu';
import rightArrow from '../../assets/images/right.svg';


const Dashboard = (props) => {
    const showSettings = (event) => {
        event.preventDefault();
    }

    const goToApplyForm = () => {
        props.formRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }

    return (
        <div ref={props.mainRef} className={`${style.container}`}>
            <div className={`max-width flex justify_between align_center ${style.header}`}>
                <div className='mg-left2'>
                    <div className={style.logo}>NEXT</div>
                    <div className={style.logo}>UNIVERSE</div>
                </div>
                <Menu right>
                    <div id="home" className="menu-item" >Home</div>
                    <div id="about" className="menu-item" >About</div>
                    <div id="contact" className="menu-item" >Contact</div>
                    <div onClick={showSettings} className="menu-item--small" >Settings</div>
                </Menu>
            </div>
            <div className={`mg-left2 mg-tp8 ${style.lineh}`}>
                <div className={style.headText}>Welcome to</div>
                <div className={style.headText}>the <span className={style.future}>future</span></div>
                <button onClick={goToApplyForm} className={`${style.applybtn} flex align_center justify_center mg-tp1 gap`}>APPLY NOW 
                <img className={style.arrow} src={rightArrow} alt='arrow'/>
                </button>
            </div>
        </div>
    )
}

export default Dashboard;