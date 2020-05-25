import React,{useState, useEffect} from 'react'
import {Input, 
    Table, 
    Button,
    ListGroup, 
    ListGroupItem, 
    DropdownMenu, 
    DropdownItem, 
    ButtonDropdown, 
    DropdownToggle, 
    InputGroupAddon, InputGroup, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransaction,fetchUserAddress } from '../Redux/Action';
import Axios from 'axios'
import qs from 'qs'

function Transaction() {
    const [dropdownOpen, setOpen] = useState(false);
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState([])
    const [donasi, setDonasi] = useState(false)
    const [select, setSelect] = useState(null)
    const [address, setAddress] = useState(null)
    const [originId, setOriginId] = useState('')
    const [destination, setDestination] = useState('')
    const [weight, setWeight] = useState('')
    const [courier, setCourier] = useState('jne')
    const [modal, setModal] = useState(false);
    const [cost, setCost] = useState(null)

    const toggleModal= () => setModal(!modal);

    const fetchOngkir = async () => {
        let response = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/city`, {
            headers : {
                'key': 'ab74ed9491c2f80c0636e67cbec13c0e'
            }
        })
        console.log(response.data.rajaongkir.results, 'INI RAJA ONKIR')
    }
    useEffect(() => {
        dispatch(fetchTransaction(1))
        dispatch(fetchUserAddress(1))
    }, [dispatch])
    

    const dataCart = useSelector(state => state.dataTrans.dataCart)
    const userAddress = useSelector(state => state.dataTrans.userAddress)
    console.log(dataCart)
    console.log(userAddress)

    const renderProduct = (originId,address) => {
        return dataCart.map((val)=> {
            return(
                <div className='row'>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-6'style={{backgroundColor:'green'}} >
                                <div style={{backgroundColor:'blue',height:'200',width:'60'}}>
                                  {val.nama_product}  </div>
                                    {val.image_product}
                            </div><hr></hr>
                            <div className='col-6'>
                                <div className=''><h5>{val.username}</h5></div>
                                <div style={{color: 'grey'}}>{val.city_name}</div>
                                <div><strong>{val.nama_product}</strong></div>
                                <div style={{color: 'orange'}}><strong>Rp {(val.harga.toLocaleString())}</strong></div>
                                <div style={{color: 'grey'}} >{val.qty} barang ({val.condition}) berat {val.weight*val.qty} gram</div>
                                <hr className=' m-2'></hr>
                                <div className='m-auto' >
                                Subtotal : <b style={{color: 'orange'}} >Rp {(val.harga*val.qty).toLocaleString()}</b>
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='m-3'>   
                            <div>Pilih Durasi</div>
                            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} onClick={()=> setSelect(val.productId) } >
                                <DropdownToggle caret color="info">
                                    Pengiriman
                                    </DropdownToggle>
                                {renderDropdown(address, select,val.productId, originId,val.city_id_rajaongkir, val.weight*val.qty)}
                            </ButtonDropdown>
                            </div>
                        </div>
                </div>
            )
        })
    }
    
    const toggle = () => setOpen(!dropdownOpen);

    const renderDropdown = ( address, select, id, originId, destination, weight) => {
        if(select === id){
            if(address) {
                if(cost === null && originId){
                    cekOngkir(originId,destination, weight)
                    console.log('cek ONGKIR')
            }
            console.log(originId,destination,weight)
            if(cost){
                return(
                    cost.map((item)=>{
                        return(
                            <DropdownMenu>
                    <DropdownItem>{item.service}</DropdownItem>
                    <DropdownItem>{item.description}</DropdownItem>
                </DropdownMenu>
                )
            })
            )
        }
        }
        else{alert('Pilih Alamat pengiriman')}
    }
    }

    const cekOngkir = async (originId,destination,weight) => {
        let data = {
            origin: originId,
            destination:destination,
            weight: weight,
            courier: 'jne'
        }
        console.log(data)
        let response = await Axios({
            method:'POST',
            url: `https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost`,
            data : qs.stringify(data),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'key': 'ab74ed9491c2f80c0636e67cbec13c0e'
            },
        })
        console.log(response.data.rajaongkir.results[0].costs)
        setCost(response.data.rajaongkir.results[0].costs)
    }

    const renderTotal = () => {
        let output= 0
        dataCart.forEach((val)=> {
            output += (val.harga*val.qty)
        })
        return output
    }

    const renderGrandTotal = () => {
        let output = 0
        let donasi =  
        dataCart.forEach((val)=> {
            output += (val.harga*val.qty)
        })

    }

    const modalAddress = () => {
        return(
        <Modal isOpen={modal} toggle={toggleModal} >
            <ModalHeader toggle={toggleModal}>Pilih Alamat</ModalHeader>
            <ModalBody>
                {renderCardAddress()}     
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={toggleModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
        )
    } 
    

    const renderCardAddress = () => {
        return userAddress.map((val)=>{
            return (
            <Card body>
                <CardTitle><h5>Alamat</h5></CardTitle>
                <CardText >{val.street_name},Kota {val.city_name}, Provinsi {val.province_name}</CardText>
                <Button color='success' onClick={()=> handleAddress(val.address_id, val.city_id_rajaongkir)} >Pilih Alamat</Button>
            </Card>
            )
        })
    }

    const handleAddress = (address_id,city_id) => {
        setAddress(address_id)
        setOriginId(city_id)
    }

    const renderAddress = (address) => {
        return userAddress.map((val)=>{
            if(address === val.address_id){
                return(
                    <div>
                        {val.street_name},Kota {val.city_name}, Provinsi {val.province_name}
                    </div>
                )
            }
        })
    }
     return (
        <div className='container'>
            <div className='mb-3'>
                <h3>Checkout</h3>
            </div>
            <div className='row'>
                <div className='col-8'>
                    <div>
                        <h5>Alamat Pengiriman</h5>
                    </div>
                    <hr ></hr>

                    // Nama user, contact, alamat diambil dari fetchlistuser ketiga login
                        <Table>
                            <tbody>
                                <tr> Nama User</tr>
                                <tr> Contact</tr>
                                Alamat : <div style={{color: 'grey'}}>{renderAddress(address)}</div>
                            </tbody>
                            <tfoot>
                            <Button color="danger" onClick={toggleModal}>Pilih Alamat Lain</Button>
                            <Button className='ml-3 mt-3 mb-3'>Tambah Alamat Lain</Button>    
                            {modalAddress()}                                
                            </tfoot>
                        </Table>
                        <hr ></hr>
                            {renderProduct( originId, address)}
                </div>
                <div className='col-4'>
                    < ListGroup>
                            <ListGroupItem><h4>Ringkasan Belanja</h4></ListGroupItem>
                            <ListGroupItem>Total Harga : 
                                <b style={{color: 'orange'}}> Rp{renderTotal().toLocaleString()}</b>
                                {donasi?<div>Donasi: <b style={{color: 'orange'}}>Rp 5000</b> </div>:null}
                                {/* <div>Donasi: </div> */}
                            </ListGroupItem>
                            {/* <ListGroupItem>Total Tagihan: <b style={{color: 'orange'}}> Rp{renderGrandTotal().toLocaleString()}</b> </ListGroupItem> */}
                            <ListGroupItem>
                                <InputGroup>
                                <InputGroupAddon addonType="prepend" >
                                 <Input onChange={()=> donasi?setDonasi(false):setDonasi(true)} className='m-3' addon type="checkbox" aria-label="Checkbox for following text input" />
                                    Selamatkan Masa Depan Yatim terdampak Covid-19
                                </InputGroupAddon>
                                </InputGroup>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button>Pilih Pembayaran</Button>
                            </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
            <hr ></hr>
        </div>
    )
}

export default Transaction
