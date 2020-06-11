import React,{useState,useRef,useEffect} from 'react'
import Container from '@material-ui/core/Container';
import { Jumbotron} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import RenderCardSubmit from '../ComponentRender/RenderCardSubmit';

function PaymentAlert() {

    const dispatch = useDispatch()
    
    const {waitingPay} = useSelector(state=>state.dataTrans)
     
    const startDate = waitingPay[0].date
    const [timerHours, setTimerHours] = useState('00')
    const [timerMinutes, setTimerMinutes] = useState('00')
    const [timerSeconds, setTimerSeconds] = useState('00')
    const [date, setDate] = useState('')
    let interval = useRef()
    
    console.log(startDate,"INI CONSTANT")
    


    const startTimer = () => {
      
        const countdownTime = new Date(startDate).getTime()
        const countTime = countdownTime + 86400000
        interval = setInterval(()=> {
            const now = new Date().getTime()
            const distance = countTime - now
            // const date = new Date(countdownTime)

            const hours = Math.floor((distance % (1000 * 60 * 60 *24) / (1000*60*60)))
            const minutes = Math.floor((distance % (1000 * 60 * 60) / (1000*60)))
            const seconds = Math.floor((distance % (1000 * 60) / (1000)))
            

            if( distance < 0){
                // stop Timer
                // action 
                clearInterval(interval.current)
            }else{
                // setDate(date)
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
        }, 1000)
    }

    useEffect(() => {
        console.log('MULAI USE EFFECT')
        // dispatch(getWaitingPayment(userIdfromAuth))
        startTimer()
        return () => {
            clearInterval(interval.current)
        }
    },[])

    return (
        <Container className='m-3 p-3 border d-flex flex-column ' >
            <h5 className='d-flex justify-content-center m-3 p-2' >Segera selesaikan pembayaran Anda sebelum stok habis</h5>
            <Jumbotron fluid className='d-flex justify-content-center m-2 p-2' >
                <Container >
                    <h4 className="display-5 d-flex justify-content-center">Hello!</h4>
                    <p className="lead display-5 d-flex justify-content-center" style={{color:'grey'}} >Sisa waktu pembayaran terdekat anda</p>
                    <div className="timer">
                    <div>
                        {timerHours}
                        <span> Jam:</span>
                    </div>
                    <div>
                        {timerMinutes}
                        <span> Menit:</span>
                    </div>
                    <div>
                        {timerSeconds}
                        <span> Detik:</span>
                    </div>
                </div>
                {/* {dateTime} */}
                </Container>
            </Jumbotron>
            <div class="d-flex flex-column bd-highlight">
                <div class="d-flex justify-content-center">
                    <RenderCardSubmit data={waitingPay} />                    
                </div>
            </div>
         </Container>
    )
}

export default PaymentAlert
