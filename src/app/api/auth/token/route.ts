import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: 'No refresh token provided' }, { status: 401 });
    }

    try {
        const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload;
        const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, { expiresIn: '15m' });

        const response = NextResponse.json({ accessToken });
        response.cookies.set('accessToken', accessToken, { httpOnly: true });
        return response;
    } catch {
        return NextResponse.json({ message: 'Invalid refresh token' }, { status: 403 });
    }
}
