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
  const github = formData.get('github') as string;

  try {
    await db.execute({
      sql: 'INSERT INTO projects (title, description, icon, tech, github) VALUES (?, ?, ?, ?, ?)',
      args: [title, description, icon, JSON.stringify(tech), github]
    });

    return redirect('/admin/projects');
  } catch (error) {
    return new Response('Error creating project', { status: 500 });
  }
};