import { createUser } from '../lib/auth';
import { initDB } from '../lib/db';

async function main() {
  // Initialisation de la base de données
  await initDB();
  
  // Création du compte admin par défaut
  try {
    await createUser('rooting', 'keb3pdc9nfr*NQP*acq');
    console.log('Compte admin créé avec succès!');
    console.log('Identifiants:');
    console.log('Username: rooting');
    console.log('Password: keb3pdc9nfr*NQP*acq');
  } catch (error) {
    console.log('Le compte admin existe déjà');
  }
}

main();