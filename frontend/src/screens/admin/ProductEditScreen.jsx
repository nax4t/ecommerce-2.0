import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import { useUpdateProductMutation, useGetProductDetailsQuery } from "../../slices/productsApiSlice"

const ProductEditScreen = () => {
    const {id: productId} = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const {data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId)
    console.log(product)

    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if(product) {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await updateProduct({
            productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
            }).unwrap()
            toast.success('Product Updated')
            refetch()
            navigate('/admin/productlist')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
 
  return (
    <>
        <Link to='/admin/productlist' className="btn btn-light ny-3">Go back</Link>

        <FormContainer>
            <h1>Edit Product</h1>
            { loadingUpdate && <Loader /> }

            { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    {/* Image input placeholder */}

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter count in stock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                            type="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant="primary" className="my-3">Update</Button>

                </Form>
            ) }
        </FormContainer>
    </>
  )
}

export default ProductEditScreen