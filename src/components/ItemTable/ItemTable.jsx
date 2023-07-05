import React, {useContext, useState} from 'react';
import Modal from '../Modal/Modal';
import { axiosInstance } from '../../services/axios.config';
import { ItemsContext, UPLOAD_ITEMS } from '../../context/itemsContext';

const ItemTable = ({item}) => {
    const {name, price, stock, id} = item
    const [modalShow, setModalShow] = useState(false);

    const {items, dispatch} = useContext(ItemsContext)

    const handleDelete = (id) => {
        axiosInstance.delete(`/${id}`)
            .then( r => {
                if (r.status === 200) {
                    console.log(r);
                    const itemsUpload = items.filter( item => item.id !== r.data.id)
                    console.log(itemsUpload);
                    dispatch({type:UPLOAD_ITEMS, payload: itemsUpload })
                }
            })
    }

    return (
        <>
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{stock}</td>
            <td style={{display: 'flex', justifyContent:'space-evenly'}}> 
                <i style={{cursor:'pointer'}} className="bi bi-pencil-square" onClick={() => setModalShow(true)}></i> 
                <i style={{cursor:'pointer'}} className="bi bi-trash3-fill" onClick={() => handleDelete(id)}></i> 
            </td>
        </tr>
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            item={item}
        />
        </>
    );
}

export default ItemTable;
