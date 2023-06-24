import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup' ;
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';


const Modal = (props) => {

    const initialCredentials = {
        name: props.item.name || '',
        description: props.item.description || '',
        image: props.item.image || '',
        stock: props.item.stock || '',
        price: props.item.price || ''
    }

    const formSchema = Yup.object().shape({
        name: Yup.string().min(4, 'nombre demasiado corto').max(20, 'nombre demasiado largo').required('el campo el obligatorio'),
        description:  Yup.string().min(10, 'descripcion demasiado corta').max(100, 'desciprcion demasiado largo').required('el campo el obligatorio'),
        image: Yup.string().required('el campo es obligatorio'),
        stock: Yup.number().required('el campo es obligatorio'),
        price: Yup.number().required('el campo es obligatorio')
    })


    return (
        <ModalBs
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBs.Header closeButton className='bg-dark'>
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Modal heading
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
            <Formik 
                initialValues={initialCredentials}
                validationSchema={formSchema}
                onSubmit={ async (values, {setSubmitting})  => {
                    // same shape as initial values
                    console.log(values);
                    await props.onSubmit(props.item.id, values)
                    setSubmitting(false)
                    props.onHide()
                }}
            >
                {({values, errors, touched, isSubmitting, handleChange}) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='name'> Nombre del producto </label>
                                <Field id='name' type='text' placeholder='Buzo' name='name' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='description'> descripcion  </label>
                                <Field id='description' type='text' placeholder='Buzo comodo ideal para invierno' name='description' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.description && touched.description && (
                                    <ErrorMessage name='description' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='image'> imagen </label>
                                <Field id='image' type='text' placeholder='imagen' name='image' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.image && touched.image && (
                                    <ErrorMessage name='image' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='stock'> stock </label>
                                <Field id='stock' type='number' placeholder='5' name='stock' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.stock && touched.stock && (
                                    <ErrorMessage name='stock' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='price'> precio </label>
                                <Field id='price' type='number' placeholder='8000' name='price' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.price && touched.price && (
                                    <ErrorMessage name='price' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                        <Button className='btn btn-primary' type="submit">Cargar producto</Button>
                        {
                            isSubmitting ? (<p>  Enviando producto </p>) : null
                        }
                        </Form>
                    )   
                }

            </Formik>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={props.onHide}>Close</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
}

export default Modal;
