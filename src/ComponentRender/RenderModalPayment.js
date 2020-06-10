import React,{useState, useEffect} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,ListGroupItem, Input } from 'reactstrap';
import Buttonn from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom';
import { addPayment, getWaitingPayment } from '../Redux/Action';
import { useDispatch,useSelector } from 'react-redux';
import PaymentAlert from '../Pages/PaymentAlert'
import {Route} from 'react-router-dom'

function RenderModalPayment({totalTagihan,donasi,totalOngkir,serviceFee,totalBelanja,dataCart,userId}) {
    
      const [modal, setModal] = useState(false);
      const toggle = () => setModal(!modal);
      const [bank, setBank] = useState('')
      const [rekeningNum, setRekeningNum] = useState('')
      const [rekeningName, setRekeningName] = useState('')

      const dispatch = useDispatch()
     

    const handlePayment = () => {
        // dispatch action addPayment, update payment, invoice
        // Redirect ke halaman lain
        //add payment
        const shopDate = new Date().toLocaleString('en-US')
        dispatch(addPayment(shopDate,totalTagihan,donasi,totalOngkir,serviceFee,totalBelanja,userId))
        console.log(shopDate)
        console.log('BERHASILL')
        console.log(shopDate)
    }


    return (
        <div>
            <Button color="danger" onClick={toggle}>Pilih Pembayaran</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} style={{color:'grey'}} >Pembayaran</ModalHeader>
                    <ListGroupItem className='d-flex justify-content-between'>
                        <div>Total Tagihan : {<div style={{color:'orange'}} ><b>Rp{(totalTagihan).toLocaleString()}</b></div>}</div>
                        <Buttonn>Detail</Buttonn>
                    </ListGroupItem>
                    <ListGroupItem >
                        <div >Transfer Bank</div>
                        <Input type='select' width='10' onChange={(e)=> setBank(e.target.value)} >
                            <option value='' >-Pilih Bank-</option>
                            <option value='BNI' >BNI</option>
                            <option value='MANDIRI' >MANDIRI</option>
                            <option value='BCA' >BCA</option>
                            <option value='BRI' >BRI</option>
                            <option value='BRITAMA' >BRITAMA</option>
                        </Input>
                    </ListGroupItem>
                    <ListGroupItem >
                        <div className='mr-3' >No.Rekening</div>
                        <Input placeholder="Contoh: 1234567" type='number' onChange={(e)=> setRekeningNum(e.target.value)} ></Input>
                    </ListGroupItem>
                    <ListGroupItem  >
                        <div className='mr-3' >Nama Pemilik Rekening</div>
                        <Input placeholder="Contoh: Fadhy"  onChange={(e)=> setRekeningName(e.target.value)} ></Input>
                    </ListGroupItem>
                <ModalFooter className='d-flex justify-content-between'>
                {rekeningName&&rekeningNum&&bank
                ?
                <Button color="success" href='thanks' onClick={()=> handlePayment() } block >
                    Bayar
                </Button>
                :
                <Button color="success" onClick={toggle} block disabled >Bayar</Button>
                }
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default RenderModalPayment
