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
    InputGroupAddon, InputGroup, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardText, CardTitle, CustomInput } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransaction,fetchUserAddress } from '../Redux/Action';
import Axios from 'axios'
import qs from 'qs'
import update from 'react-addons-update'
import RenderModalPayment from '../ComponentRender/RenderModalPayment'


function Transaction() {
    const [dropdownOpen, setOpen] = useState(false);
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState([])
    const [donasi, setDonasi] = useState(false)
    const [select, setSelect] = useState(null)
    const [selectIndex, setSelectIndex] = useState(null)
    const [address, setAddress] = useState(null)
    const [originId, setOriginId] = useState('')
    const [destination, setDestination] = useState('')
    const [weight, setWeight] = useState('')
    const [courier, setCourier] = useState('jne')
    const [modal, setModal] = useState(false);
    const [cost, setCost] = useState([])
    const [addressProtect, setAddressProtect] = useState('')
    const [destinationRJ, setDestinationRJ] = useState('')
    const [totalArr, setTotalArr] = useState([])
    const [donasiVal] = useState(5000)
    const [totalBelanja, setTotalBelanja] = useState('')
    const [viewTagih, setViewTagih] = useState([])
    console.log(totalArr, 'INI TOTAL ONGKIR')
    console.log(selectIndex)
    console.log(select)

 

    const fetchOngkir = async () => {
        let response = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/city`, {
            headers : {
                'key': 'ab74ed9491c2f80c0636e67cbec13c0e'
            }
        })
        console.log(response.data.rajaongkir.results, 'INI RAJA ONKIR')
    }

    const userIdfromAuth = 1
    useEffect(() => {
        console.log("MASUK USEEFEEVVT")
        dispatch(fetchTransaction(userIdfromAuth))
        dispatch(fetchUserAddress(userIdfromAuth))
    }, [dispatch])


    const {dataCart} = useSelector(state => state.dataTrans)
    const userAddress = useSelector(state => state.dataTrans.userAddress)
    const dataUser = useSelector(state => state.dataTrans.userAddress[0])
   
    console.log(dataCart,"Ini data Cart")
    console.log(userAddress)

    const renderProduct = (originId,address) => {
        return dataCart.map((val, index)=> {
            if(select === val.productId && selectIndex === index){
                return(
                    <div className='row'>
                    <div className='col-6'>
                        <div className='row'>
                            <div className='col-6'style={{backgroundColor:'skyblue'}} >
                                <div style={{backgroundColor:'white',height:'200',width:'60'}}>
                                  {val.nama_product}  </div>
                                    {val.image_product}
                            </div><hr></hr>
                            <div className='col-6'>
                                <div className=''><h5>{index+1}{val.username}</h5></div>
                                <div style={{color: 'grey'}}>{val.city_name}</div>
                                <div><strong>{val.nama_product}</strong></div>
                                <div style={{color: 'orange'}}><strong>Rp {(val.harga.toLocaleString())}</strong></div>
                                <div style={{color: 'grey'}} >{val.qty} barang ({val.condition}) berat {val.weight*val.qty} gram</div>
                                <hr className=' m-2'></hr>
                                <div className='m-auto' >
                                Subtotal : 
                                 {totalArr[index]
                                 ?
                                 <b style={{color: 'orange'}} >Rp {((val.harga*val.qty)+totalArr[index].value).toLocaleString()}</b>
                                 :
                                <b style={{color: 'orange'}} >Rp {(val.harga*val.qty).toLocaleString()}</b>
                                }   
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='m-3'>   
                            <div>Pilih Durasi Pengiriman</div>
                            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} onClick={()=> setSelect(val.productId) }>
                                {cost.length>0
                                ?
                                <DropdownToggle caret color="info">
                                    Pilih
                                </DropdownToggle>
                                :
                                <DropdownToggle caret color="info" disabled>
                                    loading...
                                </DropdownToggle>
                                }
                                {renderDropdown(address, select,selectIndex,index, val.productId, originId,val.city_id_rajaongkir, val.weight*val.qty)} 
                            </ButtonDropdown>
                            {totalArr[index]?
                            <div>
                            <b>Kurir Pilihan</b>
                            <div style={{color:'grey'}}>Rp{(totalArr[index].value).toLocaleString()} ({totalArr[index].etd} hari)</div>
                            </div>
                            :
                            null
                            }
                            </div>
                        </div>
                </div>
            )
        }
        return(
            <div className='row'>
            <div className='col-6'>
                <div className='row'>
                    <div className='col-6'style={{backgroundColor:'skyblue'}} >
                        <div style={{backgroundColor:'white',height:'200',width:'60'}}>
                          {val.nama_product}  </div>
                            {val.image_product}
                    </div><hr></hr>
                    <div className='col-6'>
                        <div className=''><h5>{index+1}{val.username}</h5></div>
                        <div style={{color: 'grey'}}>{val.city_name}</div>
                        <div><strong>{val.nama_product}</strong></div>
                        <div style={{color: 'orange'}}><strong>Rp {(val.harga.toLocaleString())}</strong></div>
                        <div style={{color: 'grey'}} >{val.qty} barang ({val.condition}) berat {val.weight*val.qty} gram</div>
                        <hr className=' m-2'></hr>
                        <div className='m-auto' >
                        Subtotal : 
                            {totalArr[index]
                            ?
                            <b style={{color: 'orange'}} >Rp {((val.harga*val.qty)+totalArr[index].value).toLocaleString()}</b>
                            :
                            <b style={{color: 'orange'}} >Rp {(val.harga*val.qty).toLocaleString()}</b>
                            }   
                        </div>
                        <hr></hr>
                    </div>
                </div>
            </div>
            <div className='col-6'>
                <div className='m-3'>   
                    <div>Pilih Durasi Pengiriman</div>
                    <ButtonDropdown toggle={()=> handelSelect(val.productId, index)} >
                        <DropdownToggle caret color="info">
                            Pengiriman
                        </DropdownToggle>
                    </ButtonDropdown>
                    {totalArr[index]?
                    <div>
                    <b>Kurir Pilihan</b>
                    <div style={{color:'grey'}}>Rp{(totalArr[index].value).toLocaleString()} ({totalArr[index].etd} hari)</div>
                    </div>
                    :
                    null
                    }
                    </div>
                </div>
        </div>
        )
        })
    }
    
    const handelSelect = (productId, index) => {
        setSelect(productId)
        setSelectIndex(index)
        setCost([]) 
    }

    const toggle = () => {
       setOpen(!dropdownOpen)
        
    };

    const renderDropdown = ( address, select, selectIndex,index, id, originId, destination, weight) => {
        if(select === id){
            if(address) {
                console.log(originId,destination,'=', destinationRJ,weight)
                console.log(selectIndex,index,"INI KUMPULAN INDEX") 
                if(cost.length>0 && destination==destinationRJ){
                    return(
                        cost.length>2
                        ?
                    <DropdownMenu>
                        <DropdownItem onClick={()=> handlePengiriman(cost[0].cost[0].value,cost[0].cost[0].etd)}>
                        <b>Ekonomis ({cost[0].cost[0].etd} hari)</b>
                        <div color='grey'>Rp{cost[0].cost[0].value}</div>
                        </DropdownItem>
                        <DropdownItem onClick={()=> handlePengiriman(cost[1].cost[0].value,cost[1].cost[0].etd)}>
                        <b>Reguler ({cost[1].cost[0].etd} hari)</b>
                        <div color='grey'>Rp{cost[1].cost[0].value}</div>
                        </DropdownItem>
                        <DropdownItem onClick={()=> handlePengiriman(cost[2].cost[0].value,cost[2].cost[0].etd)}>
                        <b>Next day ({cost[2].cost[0].etd} hari)</b>
                        <div color='grey'>Rp{cost[2].cost[0].value}</div>
                        </DropdownItem>
                    </DropdownMenu>    
                    :
                    <DropdownMenu>
                            <DropdownItem onClick={()=> handlePengiriman(cost[0].cost[0].value,cost[0].cost[0].etd)}>
                            <b>Ekonomis ({cost[0].cost[0].etd} hari)</b>
                            <div color='grey'>Rp{cost[0].cost[0].value}</div>
                            </DropdownItem>
                            <DropdownItem onClick={()=> handlePengiriman(cost[1].cost[0].value,cost[1].cost[0].etd)}>
                            <b>Reguler ({cost[1].cost[0].etd} hari)</b>
                            <div color='grey'>Rp{cost[1].cost[0].value}</div>
                            </DropdownItem>
                        </DropdownMenu>    
                )}else if(originId ){
                    console.log('cek ONGKIR')
                    cekOngkir(originId,destination, weight)
            }
        }else if(addressProtect === 'oke'){
            // setAddressProtect('oke')
            console.log('YEAY')
        }else{
            alert('Pilih Alamat pengiriman')
            setAddressProtect('oke')
        }
    }
    }

    const totalOngkir = totalArr.reduce((totKir, val)=> totKir + val.value,0)
    
    console.log(totalOngkir, "ININI TOTAL ONGKIR")
    const renderTotalOngkir = (jumlah, total) => {
        return totalOngkir
    }
    console.log(totalArr, "HASIL TOTAL")

    const totalWeightFromViewTagih = viewTagih.reduce((a,b)=>a+b.weight,0)
    const totalWeightFromTotalArr = totalArr.reduce((a,b)=>a + b.weight,0)
    console.log(totalWeightFromViewTagih,"INI TOTAL WEIGHT ")
    console.log(totalWeightFromTotalArr,"INI TOTAL WEIGHT ")
    const sortingOngkir = () => {
        for(let i=0;i<dataCart.length;i++){
            setTotalArr(totalArr => [...totalArr,{id:dataCart[i].productId,value:0,etd:0,weight:0}])
            setViewTagih(viewTagih => [...viewTagih,{weight:dataCart[i].weight}])
        }
    }

    const handlePengiriman = (cost,etd) => {
        const totalUpdate = totalArr
        if(totalArr[selectIndex].id === select){
           setTotalArr(update(totalUpdate,{
               [selectIndex]: {
                   value: {$set:cost},
                   etd:{$set:etd},
                   weight:{$set:dataCart[selectIndex].weight}
               }
           }))
       }
    }

    const cekOngkir = async (originId,destination,weight) => {
        let data = {
            origin: originId,
            destination:destination,
            weight: weight,
            courier: 'jne'
        }
        let response = await Axios({
            method:'POST',
            url: `https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/cost`,
            data : qs.stringify(data),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'key': 'ab74ed9491c2f80c0636e67cbec13c0e'
            },
        })
        setCost(response.data.rajaongkir.results[0].costs)
        setDestinationRJ(response.data.rajaongkir.destination_details.city_id)
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
        dataCart.forEach((val)=> {
            output += (val.harga*val.qty)
        })

    }
    const toggleModal= () => setModal(!modal);
    
    const handleTogleAddress = () => {
        setTotalArr([])
        setViewTagih([])
        toggleModal()
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
        setCost([])
        sortingOngkir()
        toggleModal()
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
                        <Table>
                            <tbody>
                            {dataUser
                            ?
                            <div>
                                <tr style={{fontWeight:'bold'}} >{dataUser.name}</tr>
                                <tr style={{fontWeight:'normal'}} >{dataUser.phone}</tr>
                            </div>
                            :
                            null}
                                Alamat : <div style={{color: 'grey'}}>{renderAddress(address)}</div>
                            </tbody>
                            <tfoot>
                            <Button color="danger" onClick={handleTogleAddress}>Pilih Alamat Lain</Button>
                            <Button className='ml-3 mt-3 mb-3'>Tambah Alamat Lain</Button>    
                            {modalAddress()}                                
                            </tfoot>
                        </Table>
                        <hr ></hr>
                        <div >
                        {renderProduct( originId, address)}
                        </div>          
                     
                </div>
                <div className='col-4'>
                    < ListGroup>
                            <ListGroupItem><h4>Ringkasan Belanja</h4></ListGroupItem>
                            <ListGroupItem>Total Belanja : 
                                <b style={{color: 'orange'}}> Rp{renderTotal().toLocaleString()}</b>
                                {donasi?<div>Donasi: <b style={{color: 'orange'}}>Rp{donasiVal.toLocaleString()}</b> </div>:null}
                                
                                {totalArr.length>0?
                                <div>Total Ongkir : <b style={{color: 'orange'}}>Rp{renderTotalOngkir().toLocaleString()}</b></div>
                                :
                                null
                                }
                                <div >Biaya Layanan: <b style={{color: 'orange'}}>Rp{(5/100*renderTotal()).toLocaleString()}</b></div>
                            </ListGroupItem>
                            <ListGroupItem><b>Total Tagihan:</b>
                            {totalWeightFromViewTagih === totalWeightFromTotalArr && address
                            ? <strong>
                                {donasi
                                ?
                                <b style={{color: 'orange'}}>Rp{(renderTotal()+donasiVal+renderTotalOngkir()).toLocaleString()}</b> 
                                :
                                <b style={{color: 'orange'}}> Rp{(renderTotal()+renderTotalOngkir()).toLocaleString()}</b> 
                                }
                            </strong>
                            :
                            <strong style={{color: 'orange'}} > - </strong>
                            } 
                            </ListGroupItem>
                            <ListGroupItem>
                                <InputGroup>
                                <InputGroupAddon addonType="prepend" >
                                 <Input onChange={()=> donasi?setDonasi(false):setDonasi(true)} className='m-3' addon type="checkbox" aria-label="Checkbox for following text input" />
                                    Selamatkan Masa Depan Yatim terdampak Covid-19
                                </InputGroupAddon>
                                </InputGroup>
                            </ListGroupItem>
                            <ListGroupItem>
                                {/* Pake ternary totalArr.length === dataCart.length untuk Button pembayaran */}
                                {totalArr.length === dataCart.length
                                ?
                                <RenderModalPayment 
                                totalTagihan={donasi?renderTotal()+donasiVal+renderTotalOngkir():renderTotal()+renderTotalOngkir()}
                                donasi={donasi?donasiVal:0}
                                totalOngkir={renderTotalOngkir()}
                                serviceFee={(5/100*renderTotal())}
                                totalBelanja={renderTotal()}
                                dataCart={dataCart}
                                userId={userIdfromAuth}
                                 />
                                 : 
                                <Button onClick={()=> alert("Pilih durasi pengiriman")} >Pembayaran</Button>
                                 }
                            </ListGroupItem>
                    </ListGroup>
                </div>
            </div> 
            <hr ></hr> 
        </div>
    )
}

export default Transaction
