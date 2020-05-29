import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Jumbotron } from 'reactstrap';

function PaymentAlert() {

    return (
        <Container className='border d-flex flex-column justify-content-end' >
            <h5 className='' >Segera selesaikan pembayaran Anda sebelum stok habis</h5>
            <Jumbotron fluid>
                <Container >
                <h1 className="display-3">Fluid jumbotron</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </Container>
            </Jumbotron>
         </Container>
    )
}

export default PaymentAlert
