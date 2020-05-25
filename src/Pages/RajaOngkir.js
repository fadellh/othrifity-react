import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Table, Input, Button } from 'reactstrap'
import qs from 'qs'

function RajaOngkir() {

    const [city, setCity] = useState(null)
    const [cityDestination, setCityDestination] = useState(null)
    const [province, setProvince] = useState([])
    const [province_id, setProvince_id] = useState(1)
    const [originId, setOriginId] = useState('')
    const [destination, setDestination] = useState('')
    const [weight, setWeight] = useState('')
    const [courier, setCourier] = useState('jne')

    console.log(originId)
    console.log(weight)
    console.log(destination)
    console.log(courier)

    const fetchOngkirProvince = async () => {
        let response = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/province`, {
            headers : {
                'key': 'ab74ed9491c2f80c0636e67cbec13c0e'
            }
        })
        console.log(response.data.rajaongkir.results, 'INI RAJA ONKIR')
        setProvince(response.data.rajaongkir.results)
    }

    const fetchOngkirCity = async (province_id,province_id_destination) => {
        if(province_id){
            let response = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/city?province=${province_id}`, {
                headers : {
                    'key': 'ab74ed9491c2f80c0636e67cbec13c0e'
                }
            })
            console.log(response.data, "INI HASIL DARI CITY")
            setCity(response.data.rajaongkir.results)
        }
    }
    const fetchOngkirCityDestination = async (province_id) => {
        if(province_id){
            let response = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/city?province=${province_id}`, {
                headers : {
                    'key': 'ab74ed9491c2f80c0636e67cbec13c0e'
                }
            })
            console.log(response.data, "INI HASIL DARI CITY DESTINATION")
            setCityDestination(response.data.rajaongkir.results)
        }
    }

    useEffect((province_id) => {
       fetchOngkirProvince()
       if(province_id) fetchOngkirCity()
    }, [])

    // const renderBodyCity = (city) => {
    //     if(city) return city.map((val)=> {
    //         return (
    //             <tr>
    //                 <td>{val.city_id}</td>
    //                 <td>{val.province}</td>
    //                 <td>{val.city_name}</td>
    //                 <td>{val.type}</td>
    //             </tr>
    //         )
    //     })
    // }

  const renderOptionProvince = () => {
      return province.map((val)=> {
            return (
                    <option value={val.province_id}>{val.province}</option>
            )
        })
    }
  const renderOptionCity = (city) => {
     if(city) return city.map((val)=> {
            return (
            <option value={val.city_id}>{val.city_name} dengan id ={val.city_id}</option>
            )
        })
    }

const callCity = (province_id) => {
    fetchOngkirCity(province_id)
}

const callCityDestination = (province_id) => {
    fetchOngkirCityDestination(province_id)
}

const selectOriginCity = (city_id) => {
    setOriginId(city_id)
}

const selectDestinationCity = (city_id) => {
    setDestination(city_id)
}

const cekOngkir = async (originId, destination, weight, courier) => {
    let data = {
        origin: originId,
        destination:destination,
        weight: weight,
        courier: courier
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
    console.log(response.data)
}

    return (
        <div>
            {/* <Table>
                <thead>
                    <tr>
                        <th>City Id</th>
                        <th>Province</th>
                        <th>City name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBodyCity(city)}
                </tbody>

            </Table> */}
            <h1>Alamat User Data</h1>

            <h2>Origin City</h2>
            <Input type='select' name='Pilih provinsi' onChange={(e)=> callCity(e.target.value) }>
                {renderOptionProvince()}
            </Input>
            {city
            ?
            <Input type='select' name='pilih city' onChange={(e)=> selectOriginCity(e.target.value)}>
            {renderOptionCity(city)}
            </Input>
            :
            null
            }

        <h2>Destination City</h2>
        <Input type='select' name='Pilih provinsi' onChange={(e)=> callCityDestination(e.target.value) }>
                {renderOptionProvince()}
            </Input>
            {city
            ?
            <Input type='select' name='pilih city' onChange={(e)=> selectDestinationCity(e.target.value)}>
            {renderOptionCity(cityDestination)}
            </Input>
            :
            null
            }
            <h2 className='m-2'>Weight</h2>
            <Input type='number' placeholder='grams' onChange={(e)=>setWeight(e.target.value)} ></Input>

            <h2>Courier</h2>
            <Input type='select' placeholder='courier' onChange={(e)=> setCourier(e.target.value) }>
                <option value='jne'>JNE</option>
                <option value='tiki'>Tiki</option>
                <option value='pos'>Pos</option>
            </Input>
            <Button onClick={()=> cekOngkir(originId, destination, weight, courier)}>Cek Cost</Button>
        </div>
    )
}

export default RajaOngkir
