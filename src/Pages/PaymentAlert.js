import React,{useState,useRef,useEffect} from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Jumbotron,CustomInput,Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {addImage, getWaitingPayment} from '../Redux/Action/TransactionAction'
import { API_URL } from '../Support/API_URL';

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

    // if(waitingPay&&protectWait){
    //     setStartDate(waitingPay[1].date)
    //     setProtectWait(false)
    //     // startTimer()
        
    // }

    useEffect(() => {
        console.log('MULAI USE EFFECT')
        // dispatch(getWaitingPayment(userIdfromAuth))
        startTimer()
        return () => {
            clearInterval(interval.current)
        }
    },[])

  

    const [image, setImage] = useState({
        imageName : 'Select File...',
        imageFile : undefined
    })
    
    let handleImage = (e) => {
        if(e.target.files[0]){
            setImage({
                imageFile : e.target.files[0],
                imageName : e.target.files[0].name
            })
        }else{
            setImage({
                imageName : 'Select File...',
                imageFile : undefined
            })
        }
    }

    let handleSubmit = () => {
        // file image di image.imageFile
        let id = 38
        let formData = new FormData();
        formData.append('image', image.imageFile);
        setImage({
            imageName : 'Select File...',
            imageFile : undefined
        })
        dispatch(
            addImage(id, formData)
        )
        // setUpdate(true)
    }

    const {imagePath} = useSelector(state=>state.dataTrans)


    return (
        <Container className='m-3 p-3 border d-flex flex-column ' >
            <h5 className='d-flex justify-content-center m-3 p-2' >Segera selesaikan pembayaran Anda sebelum stok habis</h5>
            <Jumbotron fluid className='d-flex justify-content-center m-2 p-2' >
                <Container >
                    <h1 className="display-5 d-flex justify-content-center">Fluid jumbotron</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                    <div className="timer">
                    <div>
                        {timerHours}
                        <span>h</span>
                    </div>
                    <div>
                        {timerMinutes}
                        <span>m</span>
                    </div>
                    <div>
                        {timerSeconds}
                        <span>s</span>
                    </div>
                </div>
                {/* {dateTime} */}
                </Container>
            </Jumbotron>
            <div class="d-flex flex-column bd-highlight">
                <div class="d-flex justify-content-center">
                    <Jumbotron fluid>
                        <Container>
                            <h1 className="display-5 d-flex justify-content-center">Fluid jumbotron</h1>
                        <CustomInput
                         type='file'
                         name='imageName'
                         id='imageName'
                         label={image.imageName}
                         onChange={handleImage}
                        />
                         <div style={{marginTop:10}} >
                            <Button className='form-control' color='primary' onClick={handleSubmit}>
                                {
                                    'Submit'
                                }
                            </Button>
                            <img src={imagePath?API_URL+imagePath:null} alt='Gambar Todo' height='100px'/>
                        </div>
                        </Container>
                    </Jumbotron>
                </div>
            </div>
         </Container>
    )
}

export default PaymentAlert
