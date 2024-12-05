import type { APIRoute } from 'astro';
import { verifyUser, generateToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  console.log('Login attempt:', { username });

  const user = await verifyUser(username, password);
  console.log('User verification:', !!user);

  if (!user) {
    return new Response('Invalid credentials', { status: 401 });
  }

  const token = generateToken(user);
  console.log('Token generated:', !!token);

  cookies.set('token', token, {
    path: '/',
    httpOnly: true,
    // secure: true, // Commentez cette ligne
    sameSite: 'strict',
    maxAge: 60 * 60 * 24
  });
  
  return redirect('/admin');
};