import bcrypt, { hash } from "bcryptjs";
import { Request, Response } from "express";
import { ServiceUser } from "./service.user";



const CreateUser = async(req : Request, res : Response) => {

    const {name, email, password, phone, role} = req.body;

    const hashedpass = await bcrypt.hash(password, 10);

    try{
        const result = await ServiceUser.PostUser(name, email, hashedpass, phone, role);

        const user = result.rows[0];
        res.status(201).json({

            success : true,
            message : "Successfully Account Created",
            data : {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }

        })
    }catch(err : any){
        
        res.status(500).json({

            success : false,
            message : err.message

        })
    }

}

const ViewUser = async(req : Request, res : Response) => {

    try {
        const result = await ServiceUser.GetUser()

        const safeUsers = result.rows.map((user: any) => {
  const { password, ...rest } = user;
  return rest;
});

        res.status(200).json({
            success : true,
            message : "User Data Successfully retrived",
            data : safeUsers
        })
        
    } catch (error : any) {
        
           res.status(500).json({
            success : false,
            message : error.message
        })

    }

    



}

const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const userId = req.params.userId; 
    const loggedInUser: any = req.user;

    // Customer → only update own ID
    if (loggedInUser.role === "customer" && String(loggedInUser.id) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "Customer can update only his own profile",
      });
    }

    // Only admin can change role
    if (role && loggedInUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can change role",
      });
    }

    // Hash password only if provided
    let hashpass = null;
    if (password) {
      hashpass = await bcrypt.hash(password, 10);
    }

    // Call service (ID দিয়ে update)
    const result = await ServiceUser.PutUser(
      name ?? null,
      email ?? null,
      hashpass,
      phone ?? null,
      role ?? null,
      userId
    );

    if (!result.rowCount) {
      return res.status(404).json({
        success: false,
        message: "User not found or invalid userId",
      });
    }

    const user = result.rows[0];
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: safeUser,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const hasActiveBookings = await ServiceUser.hasActiveBookings(userId);

    if (hasActiveBookings) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete user because the user has active bookings",
      });
    }

    const result = await ServiceUser.deleteUser(userId);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or invalid userId",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const UserControler = {
    CreateUser,
     ViewUser,
     UpdateUser,
     DeleteUser
}