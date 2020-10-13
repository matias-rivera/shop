import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'root@admin.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true

    },
    {
        name: 'John Doe',
        email: 'johndoe@user.com',
        password: bcrypt.hashSync('123456',10)

    },
    {
        name: 'Matias Rivera',
        email: 'matiasrivera@user.com',
        password: bcrypt.hashSync('123456',10)

    }
]

export default users