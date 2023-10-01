// Import the functions you need from the SDKs you need
// import { } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-"SERVICE".js'


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore , collection ,onSnapshot,
          addDoc, deleteDoc, doc,
          query, where,
          orderBy, serverTimestamp,
          getDoc, updateDoc,get, getDocs
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
const colRef_user_collection=collection(db,'users')


// Queries

const q = query(colRef_theband_collection,orderBy('CreateAt')); // default : ascending



// Get real time collection data



            // READ DATA
// var data = onSnapshot(q,(snapshot)=>{
//   let infor=[]
//   snapshot.docs.forEach(doc=>{
//     infor.push({...doc.data(),id:doc.id})
//     })
//     console.log(infor);   
// })
    
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

const test_field = document.querySelector('.js-DelTheBandCollection')
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

// const docRef = doc(db,"theband_collection",'hgxxIxeaTvftenYrYNZg');

// onSnapshot(docRef,(doc)=>{
//   console.log(doc.data(),doc.id)
// })


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
    const email_real = signupForm.email.value;
    const password_real = signupForm.password.value;
    createUserWithEmailAndPassword(auth,email_real,password_real)
    .then((cred)=>{
        alert(`User created : `,cred.user)
        signupForm.reset()

      onAuthStateChanged(auth, (user) => {
    // Thêm data vào collection users  
      addDoc(colRef_user_collection,{
        name: '',
        email:`${email_real}`,
        password:`${password_real}`,
        CreateAt : serverTimestamp(),
        isAdmin:"false",
        UID:`${user.uid}`
      })
    })
    console.log("Document written with ID: ", docRef.id);

    // Close signupModal
    const SignupModal= document.querySelector('.js-modal-Signup')
    SignupModal.classList.remove('open');
    })
    .catch((error)=>{
      console.log(error.message)
    })

     
      

  })


//  Log out 
const LogoutButton = document.querySelector('.logout-button')
LogoutButton.addEventListener('click', ()=>{
    signOut(auth)

    .then(()=>{
      
      // Lấy tham chiếu đến phần tử  muốn xóa
      const elementToRemove = document.querySelector('#nav li a[href="./admin.html"]');

      // Kiểm tra xem phần tử có tồn tại không trước khi xóa
      if (elementToRemove) {
        // Sử dụng remove() để xóa phần tử
        elementToRemove.parentElement.remove(); // Xóa <li> chứa liên kết
      }

      alert('You have been signed out !')

    })
    .catch((error)=>{
      alert(error.message)
    })
})


// Log in 
const LoginForm = document.querySelector('.js-login-form');
LoginForm.addEventListener('submit', (e)=>{
  const email_login =LoginForm.email.value
  const password_login = LoginForm.password.value
  e.preventDefault();
  signInWithEmailAndPassword(auth,email_login,password_login)
  .then((userCredential)=>{
    alert(`You have been loged in`,userCredential.user)
    // Close modal
    const modalLogin = document.querySelector('.js-modal-login');
    modalLogin.classList.remove('open');

    LoginForm.reset();

  })
  .catch((error) => {
    alert(`Wrong user email :  ${email_login} or password !`);
    console.log(err.message)
  });
});


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

// 


// Data từ database hiện lên trang html
// const theband_data_form = document.querySelector('.theband_data_form');

// var data = onSnapshot(colRef_theband_collection,(snapshot)=>{
//   // let infor=[]
//   let html='';
//   snapshot.docs.forEach(doc=>{

//     // infor.push({...doc.data(),id:doc.id})

//     const li=`
//       <li>
//           <div class="collapsible-header grey lighten-4">Id : ${doc.id} </div>
//           <div class="collapsible-body white">Last name : ${doc.data().last}</div>
//           <div class="collapsible-body white">Birth : ${doc.data().born}</div>
//       </li>
//     `;
//     html+=li;

//     })
//     theband_data_form.innerHTML = html;

//     // console.log(infor);
    
// })


// <!-- Click vào collapsible-header -->

// // Lấy phần tử form có lớp là "collapsible"
// const formElement = document.querySelector('.collapsible');
// // Lấy tất cả các phần tử <li> trong form
// const listItemsInForm = formElement.querySelectorAll('li');
// // Đếm số lượng phần tử <li>
// const numberOfListItems = listItemsInForm.length; 

//         // Lấy tất cả các phần tử .collapsible-header trong DOM
//         const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

//         // Lặp qua từng phần tử .collapsible-header và thêm sự kiện click
//         collapsibleHeaders.forEach(header => {
//         header.addEventListener('click', function() {
//             // Tìm phần tử .collapsible-body cùng cấp với .collapsible-header
//             for(var i=0;i<numberOfListItems;i++){
//               if(i==0){
//                  i = this.nextElementSibling;
//               }
//               else
//               {
//                   i= (i+1).nextElementSibling;
                
//               }
//               // Kiểm tra trạng thái hiển thị của .collapsible-body
//               if (i.style.display === 'none' || i.style.display === '') {
//               // Nếu đang ẩn, hiển thị .collapsible-body
//               i.style.display = 'block';
  
//               } else {
//               // Nếu đang hiển thị, ẩn .collapsible-body
//               i.style.display = 'none';
  
//               }
//             }
            
//         });
//         });     
     



// Thêm cái chuyển hướng page admin khi admin đăng nhập

auth.onAuthStateChanged(user=>{
  // đăng nhập thành công
  if(user)
  {
    const userUID=user.uid;
    const nav=document.getElementById('nav');
   
    var data = onSnapshot(colRef_user_collection,(snapshot)=>{
        snapshot.docs.forEach(doc=>{
          // Kiểm tra có phải admin không
          if(doc.data().isAdmin == "true" && doc.data().UID == userUID ){
            console.log('isAdmin ? value : ', (doc.data().isAdmin));
            var html=`<li><a href="./admin.html">Go to admin page</a></li>`;
            nav.insertAdjacentHTML('beforeend', html);
            alert("Loged in as admin ! ");
          }  
          })        
      })
  }
});




