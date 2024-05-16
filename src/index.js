//Import only the initializeApp function from the Firebase SDK
import {initializeApp} from 'firebase/app';

/*Import only the getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot,
query, where, orderBy, serverTimestamp, getDoc and updateDoc functions from the Firebase Firestore SDK*/
import 
{
    getFirestore, 
    collection, 
    addDoc, 
    deleteDoc, 
    doc, 
    onSnapshot, 
    query, 
    where, 
    orderBy, 
    serverTimestamp,
    getDoc,
    updateDoc
} 
from 'firebase/firestore';

/*Import only the getAuth, createUserWithEmailAndPassword, 
signInWithEmailAndPassword, signOut and onAuthStateChanged functions from the Firebase Auth SDK*/
import
{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from 'firebase/auth';

//Firebase configuration object
const firebaseConfig = 
{
    apiKey: "AIzaSyDDqMW7ZKLd5ejHDszR4P8zoTTEKqiIHfE",
    authDomain: "adbeat-medical-suite.firebaseapp.com",
    projectId: "adbeat-medical-suite",
    storageBucket: "adbeat-medical-suite.appspot.com",
    messagingSenderId: "396449460745",
    appId: "1:396449460745:web:9a50d9b70df3250133fed8"
};


        /* ----------Initialize Firebase---------- */

//Initialize Firebase using the configuration object as an argument to the initializeApp function
initializeApp(firebaseConfig);


        /* ----------Initialize Services---------- */

//Create a Firestore database object using the getFirestore function
const medicalDatabase = getFirestore();

//Create an Auth object using the getAuth function
const authorization = getAuth();


        /* ----------Collection Reference (Refer only to the Firestone collections you need)---------- */

//Create a reference to the patients collection in the Firestore database
const collectionReference = collection(medicalDatabase, 'patients');


        /* ----------Firestore Queries---------- */

//Create a query to order the patients collection by the createdAt field in ascending order
const firstNameQuery = query(collectionReference,  orderBy('createdAt'));


        /* ----------Get the Collection Data in Real-Time using the query---------- */

//Listen for real-time updates to the patients collection using the onSnapshot function
onSnapshot(firstNameQuery, (snapshot) =>
    {
        //Create an empty array to store the patient data
        let patients = [];

        //Loop through the snapshot of the patients collection and push the document ID and data to the patients array
        snapshot.docs.forEach(doc => 
        {
            patients.push(doc.id, doc.data());
        });

        //Log the patient data to the console
        console.log(patients);        
    })


        /* ----------Doctor Register---------- */   
const registerDoctor = document.querySelector('.register-doctor');

/*Listen for the submit event on the HTML form element with the class register-doctor 
and prevent the default form submission behavior*/
registerDoctor.addEventListener('submit', (e) =>
    {
        e.preventDefault();

        //Get the email and password values from the HTML form and store them in variables
        const email = registerDoctor.email.value;
        const password = registerDoctor.password.value;

        //Create a new user with the email and password values using the createUserWithEmailAndPassword function
        createUserWithEmailAndPassword(authorization, email, password)
        //Use a promise to handle the success and error cases. If the doctor is successfully registered, reset the form.
        .then((cred) => 
            {
                console.log('Doctor Registered: ', cred.user);
                registerDoctor.reset();
            })
            .catch((error) => 
            {
                console.log('Error: ', error.message);
            })
    })   


        /* ----------Doctor Login---------- */
const loginDoctor = document.querySelector('.login-doctor');
loginDoctor.addEventListener('submit', (e) =>
    {
        e.preventDefault();

        //Sign in the doctor with the email and password values using the signInWithEmailAndPassword function
        signInWithEmailAndPassword(authorization, loginDoctor.email.value, loginDoctor.password.value)
        //Use a promise to handle the success and error cases. If the doctor is successfully logged in, reset the form.
        .then((cred) => 
            {
                //console.log('Doctor logged in: ', cred.user);
                loginDoctor.reset();
            })
            .catch((error) => 
            {
                console.log('Error logging in: ', error.message);
            })
    })


            /* ----------Doctor Logout---------- */
const logoutDoctor = document.querySelector('.logout-doctor');
logoutDoctor.addEventListener('click', () =>
    {
        signOut(authorization)
        //Use a promise to handle the success and error cases.
        .then(() => 
            {
                //console.log('Doctor logged out');
            })
            .catch((error) => 
            {
                console.log('Error logging out: ', error.message);
            })
    })


        /*Subscribing to Auth changes*/

/*Listen for changes in the doctor's authentication state using the onAuthStateChanged function.
 So, every time the user logs in or out, the console will log the user object or null respectively.*/ 
onAuthStateChanged(authorization, (user) =>
    {
        if(user)
            {
                console.log('Doctor logged in: ', user);
            }
            else
            {
                console.log('Doctor logged out');
            }
        })   


        /* ----------Get a Single Patient---------- */ 
        
const documentReference = doc(medicalDatabase, 'patients', '4u72YLiXujJYgDZupxfk');

onSnapshot(documentReference, (doc) =>
    {
        if(doc.exists())
            {
                console.log(doc.id, doc.data());
            }
            else
            {
                console.log('No such patient!');
            }
    })


        /* ----------Add a New Patient---------- */

/*Get the add patient form element from the HTML document and store it in a variable. 
Then, the event listener listens for the submit event on the HTML form element 
with the class add-patient and prevents the default form submission behavior*/
const addPatient = document.querySelector('.add-patient');

addPatient.addEventListener('submit', (e) =>
    {
        e.preventDefault()

        //Add a new document to the patients collection in the Firestore database with the HTML form data as the document data
        addDoc(collectionReference, 
        {
            firstName: addPatient.firstName.value,
            lastName: addPatient.lastName.value,
            email: addPatient.email.value,
            mobile: addPatient.mobile.value,
            createdAt: serverTimestamp()
        })

        //Reset the form after the document has been added to the Firestore database
        .then(() => 
        {
            addPatient.reset();
        })
        
    })


        /* ----------Delete a Patient---------- */

/*Get the delete patient form element from the HTML document and store it in a variable. 
Then, the event listener listens for the submit event on the HTML form element 
with the class delete-patient and prevents the default form submission behavior*/
const deletePatient = document.querySelector('.delete-patient');

deletePatient.addEventListener('submit', (e) =>
    {
        e.preventDefault()

        //Create a reference to the document in the patients collection that needs to be deleted
        const documentReference = doc(medicalDatabase, 'patients', deletePatient.id.value);

        deleteDoc(documentReference, 
            {
                id: deletePatient.id.value
            })
    
            //Reset the form after the document has been deleted from the Firestore database
            .then(() => 
            {
                deletePatient.reset();
            })
    })