import React, { useState, useEffect } from 'react'
import {addImage} from '../Redux/Action/TransactionAction'
import Container from '@material-ui/core/Container';
import { API_URL } from '../Support/API_URL';
import { useSelector, useDispatch } from 'react-redux';
import { Jumbotron,CustomInput,Button,Alert } from 'reactstrap';
import update from 'react-addons-update'

function RenderCardSubmit({data}) {
    const dispatch = useDispatch()

    const [image, setImage] = useState({
        imageName : 'Select File...',
        imageFile : undefined
    })
    const [imagePreview,setImagePreview]=useState('')
    const [select,setSelect] = useState('')
    const [submit,setSubmit] = useState([])
    const {imagePath} = useSelector(state=>state.dataTrans)

    // if (event.target.files && event.target.files[0]) {
    //     this.setState({
    //       image: URL.createObjectURL(event.target.files[0])
    //     });
    //   }

   
    
    let handleImage = (e,index) => {
        if(e.target.files[0]&&e.target.files){
            // setImagePreview(URL.createObjectURL(e.target.files[0]))
            setImagePreview(update(imagePreview,{
                [index]: {
                    url: {$set:URL.createObjectURL(e.target.files[0])},
                }
            }))
        }
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

    const submitAction = () => {
        for(let i=0;i<data.length;i++){
            setSubmit(submit => [...submit,{id:data[i].id,subStatus:0}])
            setImagePreview(imagePreview=>[...imagePreview,{id:data[i],subStatus:0,url:''}])
        }
    }

    useEffect(() => {
       submitAction()

    }, [])

    let handleSubmit = (id,index,reSubmit) => {
        // file image di image.imageFile
        let formData = new FormData();
        formData.append('image', image.imageFile);
        setImage({
            imageName : 'Select File...',
            imageFile : undefined
        })
        dispatch(
            addImage(id,reSubmit,formData)
        )

        setSubmit(update(submit,{
            [index]: {
                subStatus: {$set:1},
            }
        }))
        
    }

    const renderCardSubmit = () => {
        return data.map((val,index)=> {
            if(select == val.id){
                return(
                    <Jumbotron fluid>
                    <Container>
                        <h3 className="display-5 d-flex justify-content-center">Upload</h3>
                        <div>
                        <img id='imageName' src={imagePreview[index].url?imagePreview[index].url:require('../Asset/Image/defaultImage.jpg')} alt='Bukti transaksi' height='250px'/>
                        </div>
                    <CustomInput
                    type='file'
                    name='imageName'
                    id='imageName'
                    label={image.imageName}
                    onChange={(e)=>handleImage(e,index)}
                    />
                    <div style={{marginTop:10}} >
                        {submit[index].subStatus === 1 //menandakan client telah submit
                        ?
                        <Alert color="success">
                                Terkirim!
                        </Alert>
                        :val.note
                            ?
                            <Button className='form-control' color='primary' onClick={()=> handleSubmit(val.id,index,2)} >
                                Re-Submit
                            </Button>
                            :
                            <Button className='form-control' color='primary' onClick={()=> handleSubmit(val.id,index,0)}>
                                Submit
                            </Button>
                        }
                        <Button style={{marginTop:8}} className='form-control' color='danger' onClick={()=>setSelect(null)}>
                            {
                                'Cancel'
                            }
                        </Button>
                    </div>
                    </Container>
                </Jumbotron>
                )
            }
            return(
                <Jumbotron >
                        {val.note
                        ?
                        <div>
                            <div style={{marginTop:6}} >
                                <i style={{color:'grey'}} >Pembayaran Anda dengan kode transaksi {val.id}</i> 
                            </div>
                            <div style={{marginTop:6}} >
                                <i style={{color:'grey'}} >berakhir pada {new Date(new Date(val.update_date).getTime()+86400000).toLocaleString('en-US')}</i>
                            </div>
                            <div style={{marginTop:6,color:'grey'}} >Jumlah yang harus dibayar <b style={{color:'orange'}}>Rp {(val.grand_total).toLocaleString()}</b></div>
                            <div style={{marginTop:6,color:'grey'}} ><b>Silahkan upload ulang bukti pembayaran Anda</b></div>
                            <div style={{marginTop:6,color:'grey'}} >Karena bukti pembayaran {val.note}</div>
                            <Button style={{marginTop:15}} color='success' onClick={()=>setSelect(val.id)} >Upload Ulang Bukti Pembayaran</Button>
                        </div>
                        :
                        <div>
                            <div style={{marginTop:6}} >
                                <i style={{color:'grey'}} >Pembayaran Anda dengan kode transaksi {val.id}</i> 
                            </div>
                            <div style={{marginTop:6}} >
                                <i style={{color:'grey'}} >berakhir pada {new Date(new Date(val.update_date).getTime()+86400000).toLocaleString('en-US')}</i>
                            </div>
                            <div style={{marginTop:6,color:'grey'}} >Jumlah yang harus dibayar <b style={{color:'orange'}}>Rp {(val.grand_total).toLocaleString()}</b></div>
                            <div style={{marginTop:6,color:'grey'}} >Silahkan upload bukti pembayaran Anda</div>
                            <Button style={{marginTop:15}} color='success' onClick={()=>setSelect(val.id)} >Upload Bukti Pembayaran</Button>
                        </div>
                        }
                </Jumbotron>
            )
        })
    }
    console.log(data,"ini data")
    return (
        <div>
            {data?
            <div>
                {renderCardSubmit()}
            </div>
            :
            <div>
                <img alt="thanks" src={require('../Asset/Ilustration/thanks.png')} style={{marginBottom:10}} ></img>
                <p>Belum Ada Transaksi</p>
            </div>
            }
        </div>
    )
}

export default RenderCardSubmit
