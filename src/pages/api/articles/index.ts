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
  const content = formData.get('content') as string;
  const icon = formData.get('icon') as string;
  
  // Génération du slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  try {
    await db.execute({
      sql: 'INSERT INTO articles (title, description, content, icon, slug) VALUES (?, ?, ?, ?, ?)',
      args: [title, description, content, icon, slug]
    });

    return redirect('/admin/articles');
  } catch (error) {
    return new Response('Error creating article', { status: 500 });
  }
};