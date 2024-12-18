import { useState } from "react"
import { Link, useLoaderData } from "react-router-dom"

export default function Users() {

    const initialUser = useLoaderData()
    const [users, setUsers] = useState(initialUser)
    const handleClick = id => {
        fetch(`http://localhost:5001/user/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    alert('Successfully deleted found');
                    const remainingUsers = users.filter(user => user._id !== id)
                    setUsers(remainingUsers)
                }

            })
    }
    return (
        <div className="container mt-20 mx-auto">
            <h3 className="text-center font-semibold mb-7">Total user:{users.length}</h3>
            <div className="divider"></div>
            <div className="container grid grid-cols-3 gap-10">
                {
                    users.map(user => <div key={user._id} className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{user.name}</h2>
                            <p>{user.email}</p>
                            <div className="card-actions justify-between mt-4">
                                <Link to={`/update/${user._id}`} className="btn btn-success" >Update</Link>
                                <button className="btn btn-error" onClick={() => handleClick(user._id)}>Delete</button>

                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div >

    )
}
