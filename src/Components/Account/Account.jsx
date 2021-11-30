const Account = props => {
  return (
    <table className='table table-hover' id='shoppingcart'>
      <caption>User Detail</caption>
      <thead>
        <tr>
          <th scope='col'>First Name</th>
          <th scope='col'>Last Name</th>
          <th scope='col'>Address</th>
          <th scope='col'>Phone Number</th>
          <th scope='col'>Email</th>
          <th scope='col'>Account Lockout</th>
        </tr>
      </thead>
      <tbody>
        {props.userdetail.map(user => {
          return (
            <tr>
              <th scope='row'> {user.FistName} </th>
              <td>{user.LastName}</td>
              <td>${user.Address}</td>
              <td>{user.PhoneNumber}</td>
              <td>${user.Email}</td>
              <td>${user.Accountlockout}</td>
              <td>
                <button className='button success'> Edit </button>
              </td>
            </tr>
          );
        })}
        <tr>
          <th scope='row'></th>
          <td colSpan='2' className='table-primary'></td>
        </tr>
      </tbody>
    </table>
  );
};
export default Account;
