import type { APIRoute } from 'astro';
import { db } from '../../lib/db';
import { sendContactEmail } from '../../lib/mail';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs sont requis' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Sauvegarde dans la base de données
    await db.execute({
      sql: 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      args: [name, email, message]
    });

    // Envoi de l'email
    await sendContactEmail(name, email, message);

    return new Response(
      JSON.stringify({ success: true }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: 'Une erreur est survenue lors de l\'envoi du message' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};