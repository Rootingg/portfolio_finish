import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  // Vérification de l'authentification
  const token = cookies.get('token')?.value;
  if (!token || !verifyToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;
  const tech = (formData.get('tech') as string).split(',').map(t => t.trim());


  try {
    await db.execute({
      sql: 'INSERT INTO ctfs (title, description, icon, tech) VALUES (?, ?, ?, ?)',
      args: [title, description, icon, JSON.stringify(tech)]
    });

    return redirect('/admin/ctfs');
  } catch (error) {
    return new Response('Error creating ctf', { status: 500 });
  }
};