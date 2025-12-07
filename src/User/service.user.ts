import { PGpool } from "../config/Db"

const PostUser = async(name : string , email : string , hashedpass : string , phone : string , role : string) => {

     const result = await PGpool.query( `INSERT INTO Users(name, email, password, phone, role)VALUES($1, $2, $3 , $4, $5) RETURNING *`, [name, email,hashedpass,phone, role])

    return result;

}

const GetUser = async () => {
    const result = await PGpool.query(`SELECT * FROM Users`)
    return result
}

const PutUser = async (
  name: string | null,
  email: string | null,
  hashpass: string | null,
  phone: string | null,
  role: string | null,
  userId: string
) => {
  const result = await PGpool.query(
    `UPDATE users SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        phone = COALESCE($4, phone),
        role = COALESCE($5, role)
     WHERE id = $6
     RETURNING *`,
    [name, email, hashpass, phone, role, userId]
  );

  return result;
};



 const hasActiveBookings = async (userId: any) => {
  const result = await PGpool.query(
    `SELECT id FROM bookings WHERE customer_id = $1 AND status = 'active'`,
    [userId]
  );

  return (result.rowCount ?? 0) > 0;
};

const deleteUser = async(userId : any) => {
 console.log("Service userId:", userId); // 👀 debug





const result = await PGpool.query( `DELETE FROM Users WHERE id = $1`, [userId])
return result;
}

export const ServiceUser = {
    PostUser,
    GetUser,
    PutUser,
    hasActiveBookings,
    deleteUser
}
