// Import the functions you need from the SDKs you need
// import { } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-"SERVICE".js'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore , collection ,onSnapshot,
          addDoc, deleteDoc, doc,
          query, where,
          orderBy, serverTimestamp,
          getDoc, updateDoc
} from "firebase/firestore";

import { getAuth ,
        createUserWithEmailAndPassword,
        signOut,signInWithEmailAndPassword,
        onAuthStateChanged
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCORWK6LpUJtm8YczHaVAZw9t9n9D9e5t8",
  authDomain: "web-app-2de6d.firebaseapp.com",
  databaseURL: "https://web-app-2de6d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-app-2de6d",
  storageBucket: "web-app-2de6d.appspot.com",
  messagingSenderId: "973527040004",
  appId: "1:973527040004:web:90ed74739fe53131a33551",
  measurementId: "G-PCD3FTTC2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



                        // FIRESTORE DATABASE 
// init services 
const db = getFirestore()
const auth = getAuth()

//Collection ref
const colRef_theband_collection=collection(db,'theband_collection')
const colRef_contact=collection(db,'Contact')
const colRef_Tour_Ticket = collection(db,'Tickets')

// Queries

const q = query(colRef_theband_collection,orderBy('CreateAt')); // default : ascending



// Get real time collection data



            // READ DATA
var data = onSnapshot(q,(snapshot)=>{
  let infor=[]
  snapshot.docs.forEach(doc=>{
    infor.push({...doc.data(),id:doc.id})
    })
    console.log(infor);   
})
    
//                SENDING
// user data (Contact form)
const contact_from = document.querySelector('.js-contact-form')
  contact_from.addEventListener('submit',(e)=>{
    e.preventDefault();
    addDoc(colRef_contact,{
      name: contact_from.name.value,
      email:contact_from.email.value,
      message:contact_from.message.value,
      CreateAt : serverTimestamp()
    })
    .then(()=>{
      contact_from.reset();
    })
  })

// user's wanted tickets 
const modal_form = document.querySelector('.js-modal-BuyTickets')
  modal_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    addDoc(colRef_Tour_Ticket,{
      quantity: modal_form.quantity.value,
      sender:modal_form.email.value,
      CreateAt : serverTimestamp()
    })
    .then(()=>{
      alert("Your information has been sent to us . Thank you for the support !  ")
      // alert(`Your id purchase is : ${modal_form.}`)
    })
  })


//                          DELETE

    // Theband_collection  by id

const test_field = document.querySelector('.js-DeleteTheBandCollection')
  test_field.addEventListener('submit',(e)=>{
    e.preventDefault();
    const tempRef = doc(db,'theband_collection',test_field.id.value)
    
    deleteDoc(tempRef)
    .then(()=>{
      alert("Delete successfully ! ");
    })
  })



            // ADD DATA
            
  // try {
  //   const docRef = await addDoc(collection(db, "theband_collection"), {
  //     first: "Hoang",
  //     middle: "Van Anh",
  //     last: "Duc3",
  //     born: 2002,
  //     CreateAt : serverTimestamp()
  //   });
  
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }

            
// Read single document

const docRef = doc(db,"theband_collection",'hgxxIxeaTvftenYrYNZg');

onSnapshot(docRef,(doc)=>{
  console.log(doc.data(),doc.id)
})


// Update by id

// const  updateForm = document.querySelector('.update-form');
// updateForm.addEventListener('submit',()=>{
//   e.preventDefault();
//   const docRef=doc(db,'theband_collection',updateForm.id.value)
//   updateDoc(docRef,{
//     first:"not the original value"
//   })
//   .then(()=>{
//     updateForm.reset()
//   })
// })


                       

// SIGN UP
const signupForm=document.querySelector('.js-signup-form')
signupForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
      console.log(`User created : `,cred.user)
      signupForm.reset()

  })
  .catch((error)=>{
    console.log(error.message)
  })
})


// Log in and Log out 
const LogoutButton = document.querySelector('.logout-button')
LogoutButton.addEventListener('click', ()=>{
    signOut(auth)
    .then(()=>{
      alert('You have been signed out !')
      // console.log('You have been signed out !')
    })
    .catch((error)=>{
      alert(error.message)
    })
})

const LoginForm = document.querySelector('.js-login-form')
LoginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email =LoginForm.email.value
  const password = LoginForm.password.value

  signInWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    alert(`You have been loged in`,cred.user)
    // console.log(`You have been loged in`,cred.user)
    
  })
  .catch( err =>{
    alert(`Wrong user email :  ${email} or password !`);
    console.log(err.message)
  })
})

// Subscribing to auth changes

onAuthStateChanged(auth,(user)=>{
    console.log(`user state changed : `,user)

})


// unsubcribe from changes 

// const unsubBtn=document.querySelector('.unsub')
// unsubBtn.addEventListener('click',()=>{
//   console.log('unsubcribing')
//   data()
// })

