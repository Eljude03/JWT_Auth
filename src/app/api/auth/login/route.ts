import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    // Dummy authentication logic
    if (username === 'user' && password === 'password') {
        const accessToken = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ username }, process.env.JWT_REFRESH_SECRET!);

        const response = NextResponse.json({ message: 'Logged in successfully' });
        response.cookies.set('accessToken', accessToken, { httpOnly: true });
        response.cookies.set('refreshToken', refreshToken, { httpOnly: true });

        return response;
    } else {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
