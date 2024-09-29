import userDb from '$lib/db/user.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { SECRET_KEY } from '$env/static/private'
import { redirect } from '@sveltejs/kit'

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const data = await request.formData()

        const email = data.get('email')
        const password = data.get('password')

        locals.body = {email, password}
        const user = await userDb.checkUser(locals)
        
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                const data = {id: user.id, role: user.role, name: user.title}
                const token = jwt.sign(data, SECRET_KEY, {expiresIn: "12h"})
                cookies.set('access_token', token, { path: '/' })
                redirect(303, '/admin')
            }else{
                locals.message = 'ពាក្យ​សំងាត់​មិន​ត្រឹមត្រូវ​ទេ'
            }
        }else{
            locals.message = 'Email មិន​ត្រឹមត្រូវទេ'
        }
	}
}

export async function load({ locals }) {
    //await userDb.createRootUser(locals)
    return {
        message: locals.message
    }
}