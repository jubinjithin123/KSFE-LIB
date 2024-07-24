import * as bcrypt from 'bcrypt';
import UserLoginModel from "~~/server/models/UserLogin.model";
import { SignInRequestBody } from '../../../types/user';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<SignInRequestBody | null>(event)
      

        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        const user = await UserLoginModel.findOne({ userName: body.username }).select('+password')
      

        if (!user) {
            return createError({ statusCode: 401, statusMessage: 'Invalid Username or password' })
        }


        const isPasswordCorrect = await bcrypt.compare( body.password, user.password );


        if (!isPasswordCorrect) {
            return createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
        }

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.fhc3wykrAnRpcKApKhXiahxaOe8PSHatad31NuIZ0Zg'
        setCookie(event, 'authenticated', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        })
        
        return user

        
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
