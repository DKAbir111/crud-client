import { useLoaderData } from "react-router-dom"

export default function Update() {
    const user = useLoaderData()
    const handleUpdate = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const updatedUser = { name, email }
        console.log(updatedUser);
        fetch(`http://localhost:5001/user/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('User information updated successfully');
                    event.target.reset();
                }
            })
    }
    return (
        <div className="flex justify-center items-center mt-20">

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h2 className="mt-4 text-center font-semibold">Update information for: <span className="text-red-500">{user?.name || "Default User"}</span></h2>
                <form className="card-body" onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" name="name" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
