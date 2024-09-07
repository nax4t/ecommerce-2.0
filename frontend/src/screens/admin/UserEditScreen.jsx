import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice"

const UserEditScreen = () => {
    const {id: userId} = useParams()

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isAdmin, setIsAdmin ] = useState('')
    
    const {data: user, isLoading, refetch, error} = useGetUserDetailsQuery(userId)

    const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation()
    
    const navigate = useNavigate()

    const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('user updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

    useEffect(() => {
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

  return (
    <>
        <Link to='/admin/userlist' className="btn btn-light ny-3">Go back</Link>

        <FormContainer>
            <h1>Edit User</h1>
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

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='isadmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>

                    <Button type='submit' variant="primary" className="my-3">Update</Button>

                </Form>
            ) }
        </FormContainer>
    </>
  )
}

export default UserEditScreen