import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export const DELETE: APIRoute = async ({ params, cookies }) => {
  // Vérification de l'authentification
  const token = cookies.get('token')?.value;
  if (!token || !verifyToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { id } = params;

  try {
    await db.execute({
      sql: 'DELETE FROM ctfs WHERE id = ?',
      args: [id]
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response('Error deleting ctf', { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, params, cookies, redirect }) => {
  // Vérification de l'authentification
  const token = cookies.get('token')?.value;
  if (!token || !verifyToken(token)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const formData = await request.formData();
  const method = formData.get('_method');
  
  // Si ce n'est pas une requête PUT, retourner une erreur
  if (method !== 'PUT') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { id } = params;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;
  const tech = (formData.get('tech') as string).split(',').map(t => t.trim());


  try {
    await db.execute({
      sql: 'UPDATE ctfs SET title = ?, description = ?, icon = ?, tech = ? WHERE id = ?',
      args: [title, description, icon, JSON.stringify(tech), id]
    });

    return redirect('/admin/ctfs');
  } catch (error) {
    return new Response('Error updating ctf', { status: 500 });
  }
};