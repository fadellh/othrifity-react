import React, { useState, useEffect } from 'react'
import { DropdownToggle, Button, ButtonDropdown, DropdownItem, DropdownMenu } from 'reactstrap'
// import {} from 'bootstrap-select'
import update from 'react-addons-update'

function HomeDashboard() {
    // const [total, setTotal] = useState([
    //     {id:0,value:400},
    //     {id:2, value:900}
    // ])
    const [total, setTotal] = useState([
        
    ])
    // const [total, setTotal] = useState({
        
    // })
    const [index, setIndex]= useState('')
    const [select, setSelect]= useState('')
    const [cost, setCost] = useState('')
    const [jumlah, setJumlah] = useState(90)
    const [proteksi, setProteksi] = useState(false)
    console.log(proteksi, 'INI PROTEKSI')
    
    console.log(total, "Hasil total")
    const handleTotal = (total) => {
        console.log(proteksi,"PROTEKSI DEKET JALAN MASUK")
        // if(proteksi){
            // setProteksi(false) 
            // }
            // // setTotal(total => total.concat(5))
        // setTotal(total => [...total,{id:5,value:1000}])
    }
    
    
    // const elementIndex = total.findIndex(element => element.id === 2)
    
    // const handleTotalUpdate = (total) => {
        //     let newArray = [...total]
        //     newArray[elementIndex] = {...newArray[elementIndex],value:100 }
        //     setTotal(
            //          ...newArray
            // )
    const totalOngkir = total.reduce((totKir, val)=> totKir + val.value,0)
    console.log(totalOngkir, "ININI TOTAL ONGKIR")
    const renderTotal = (jumlah, total) => {
        return totalOngkir
    }
    
    useEffect(() => {
        fetchUpdateCost()
    }, [])

    const fetchUpdateCost = () => {
            for(var i=0;i<=4;i++){
                console.log(i, 'Increment')
                setTotal(total => [...total,{id:i,value:1}])
            }
    }

    const handleTotalUpdateWithoutLoop = (cost, total, index, select) => {
        const totalUpdate = total
         console.log('MULAI FOR')
         if(index>totalUpdate.length-1){
             setTotal(total => [...total,{id:select,value:cost}])
         }
        // if(index>0){
        //     for(i=0;i<index;i++){
        //         setTotal(total => [...total,{id:i,value:0}])
        //     }
        // }
        // console.log(...totalUpdate.id, "INI KATANTA DESTRATERING")
        //  if(((index+totalUpdate.length)-index)>totalUpdate.length){
        //      setTotal(total => [...total,{id:select,value:cost}])
        //  }
         else if(total[index].id === select){
            setTotal(update(totalUpdate,{
                [index]: {
                    value: {$set:cost}
                }
            }))
        }       
    }

    const handleTotalUpdateWithoutLoopObjectState = (cost, total, index, select) => {
        const totalUpdate = total
         console.log('MULAI FOR')
        //  if(index>totalUpdate.length-1){
        //      setTotal(total => [...total,{id:select,value:cost}])
        //  }
        // if(index>0){
        //     for(i=0;i<index;i++){
        //         setTotal(total => [...total,{id:i,value:0}])
        //     }
        // }
        // console.log(...totalUpdate.id, "INI KATANTA DESTRATERING")
        //  if(totalUpdate){
            //  setTotal(total => [...total,{id:select,value:cost}])
        //  }
        console.log(total[index],"consolelog totalindex")
         if(index){
            setTotal(update(totalUpdate,{
                [index]: {
                    id:{$set:select},
                    value: {$set:cost}
                }
            }))
        }       
    }
    
    
    const handleTotalUpdate = (value, total, index, select) => {
        const totalUpdate = total
        console.log(totalUpdate)
        const protek = false
        // console.log(select, 'INI SELECT')
        console.log("JALAN 1 MASUK FIND")
        totalUpdate.find((val, idx)=>{
            const find = val.id === select
            console.log(val.id, '===', select, "ini val.id == select")
            console.log(val.id, '==', val.id, "ini val.id == val.id")
            console.log(find, "INI FIND")
                if(find){
                    console.log("VAL ID ADA") 
                    setTotal(update(totalUpdate,{
                        [index]: {
                            value: {$set:value}
                        }
                    }))
                    protek = false
                }else if(val.id === val.id){
                    protek = false
                }
                protek = true
                console.log(proteksi,"PROTEKSI SESAAT SETELAH DIA JADI TRUE")
                
            })
            console.log('JALAAN MENUJU KELUAR')
            console.log('INI BAKALAN NAMBAH')
            setTotal(total => [...total,{id:select,value:value}])
        }
        
     const nambahTotal = (proteksi) => {   
         console.log(proteksi, "INI PROTEKSI DI FUNCTION NAMBAH TOTAL")         
    }

    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!dropdownOpen)
         
     };
    const renderOption = () => {
        return (
            <select className='select-css'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            </select>
            )
    }


    return (
        <div>
            <Button onClick={()=> handleTotal(total)}>
                Nambah 1 value                
            </Button>
            <div>
            <Button onClick={()=> handleTotalUpdate(cost, total, index, select)}>
                Update  value                
            </Button>
            </div>
            <div className='m-3'>
            <Button onClick={()=> handleTotalUpdateWithoutLoop(cost, total, index, select)}>
                Update  value withouth Loop               
            </Button>
            <Button onClick={()=> handleTotalUpdateWithoutLoopObjectState(cost, total, index, select)}>
                Update  value withouth Loop OBject State              
            </Button>
            </div>
            <select className='select-css'  onChange={(e)=> setIndex(parseInt(e.target.value))} >
                    <option value='' >Index</option>
                    <option value="0">index 0</option>
                    <option value="1">index 1</option>
                    <option value="2">index 2</option>
                    <option value="3">index 3</option>
                    <option value="4">index 4</option>
             </select>
            <select className='select-css' onChange={(e)=> setSelect(parseInt(e.target.value))} >
                    <option value='' >select</option>
                    <option value='0'>Id 0</option>
                    <option value="2">Id 2</option>
                    <option value="3">Id 3</option>
                    <option value="10">Id 10</option>
                    <option value="11">Id 11</option>
             </select>
             <input type='number' onChange={(e)=> setCost(parseInt(e.target.value))} >
             </input>
            <h1>Hasil Jumlah Total : {renderTotal()}</h1>
            {/* <h1>Hasil Jumlah Total : {jumlah}</h1>
            <Button onClick={(jumlah,total)=> renderTotal(jumlah,total) } >klik jumlah</Button> */}
           
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret color="info">
                    Pilih
                </DropdownToggle>
                <DropdownMenu key='sa'>
                    <DropdownItem defaultValue='hasi'>Hasi</DropdownItem>
                    <DropdownItem>asas</DropdownItem>
                    <DropdownItem>Hsaas</DropdownItem>
                    <DropdownItem>Hsds</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>


        </div>
    )
}

export default HomeDashboard
