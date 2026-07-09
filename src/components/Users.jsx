import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);


  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await fetch(
          "https://dummyjson.com/users"
        );

        const data = await response.json();

        setUsers(data.users);

      }
      catch(error){

        console.log(error);

      }

    };


    fetchUsers();

  }, []);



  return (

    <div>

      <h1 className="title">
        Users
      </h1>


      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Age</th>

              <th>Phone</th>

              <th>Gender</th>

              <th>City</th>

            </tr>

          </thead>


          <tbody>


            {

              users.map((user)=>(


                <tr key={user.id}>


                  <td>
                    {user.id}
                  </td>


                  <td>
                    {user.firstName} {user.lastName}
                  </td>


                  <td>
                    {user.email}
                  </td>


                  <td>
                    {user.age}
                  </td>


                  <td>
                    {user.phone}
                  </td>


                  <td>
                    {user.gender}
                  </td>


                  <td>
                    {user.address.city}
                  </td>


                </tr>


              ))

            }


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default Users;