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
      sql: 'DELETE FROM contacts WHERE id = ?',
      args: [id]
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return new Response('Error deleting message', { status: 500 });
  }
};