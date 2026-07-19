/* ============================================================
   firebase-config.js — CONFIGURAÇÃO DO FIREBASE (opcional)

   Enquanto isto estiver vazio, o app funciona normalmente só com o
   navegador (localStorage), SEM sincronização.

   Para LIGAR a sincronização em tempo real entre os aparelhos:
   1) Crie um projeto grátis em https://console.firebase.google.com
   2) Adicione um app "Web" (</>) e copie o objeto firebaseConfig
   3) Cole os valores abaixo (apiKey, projectId, etc.)
   4) No console do Firebase:
        - Authentication → Sign-in method → ative "Anônimo"
        - Firestore Database → Criar banco de dados
        - Firestore → Regras → cole (para começar):
            rules_version = '2';
            service cloud.firestore {
              match /databases/{db}/documents {
                match /gse_state/{doc} {
                  allow read, write: if request.auth != null;
                }
              }
            }
   5) Publique o site novamente. Pronto: professora e alunos sincronizam.

   Obs.: estes valores NÃO são secretos (ficam no app do navegador);
   a segurança vem das Regras do Firestore acima.
   ============================================================ */
window.GSE_FIREBASE = {
  apiKey: "AIzaSyANWVVg0zIewd3Wniic0ANMonlFNaeciGk",
  authDomain: "english-club-da-gabi.firebaseapp.com",
  projectId: "english-club-da-gabi",
  storageBucket: "english-club-da-gabi.firebasestorage.app",
  messagingSenderId: "768727491814",
  appId: "1:768727491814:web:e86e5d291b3e454a0cc727",
  measurementId: "G-6B2G9RYG0Y"
};
