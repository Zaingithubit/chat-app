import { Button, Box, VStack, Container ,HStack, Input } from "@chakra-ui/react";
import Message from "./components/msessag"
import {onAuthStateChanged,getAuth,GoogleAuthProvider,signInWithPopup, signOut} from "firebase/auth"
import { app } from "./firebase";
import { useState,useEffect,useRef } from "react";
import { getFirestore ,addDoc, collection, serverTimestamp,onSnapshot,query,orderBy, } from 'firebase/firestore'

const db = getFirestore(app)


const auth = getAuth(app)

const logInHandler = ()=>{
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth,provider)
  // .then((result)=>{
  //   const user =result.user
  //   console.log(`sign  with user ${user}`)
  // }).catch((error)=>{
  //   console.log(`signed in with error ${error}`)
  // })


}

const logoutHandler= ()=>{
  signOut(auth)
}
function App() {
  
const divForScroll =useRef(null)
  const [user,setUser]=useState(false)
  const [message,setMessage]=useState('');
  const [messages ,setMessages]=useState([])
  // console.log(user)
  const submitHandler =async(e)=>{
    e.preventDefault();
    try {
  await addDoc(collection(db,'Message'),{
    text:message,
    uid :user.uid,
    url:user.photoURL,
    creatdAt:serverTimestamp()
    
  })
  setMessage('')
  divForScroll.current.scrollIntoView({behavior:'smooth'})
      
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    
  const q =query(collection(db,"Message"),orderBy('creatdAt','asc'))
    const unsubcribe =onAuthStateChanged(auth,(data)=>{
      // console.log(data)
      setUser(data)
     const unSubcribeMessage= onSnapshot(q,(snap)=>{
        setMessages(snap.docs.map(item =>{
          const id =item.id
          return{
            id,...item.data()
          }
        }))
      })
      return()=>
      {
        unsubcribe()
        unSubcribeMessage()
      }
    }) 
  
    
    }
  , [])
  
  
  return (
    <div className="App">
      <Box bg={"red.50"}>
        {
          user?<Container bg={"white"} h={"100vh"}>
          <VStack h={"full"}  padding={4}>
            <Button colorScheme="red" w={"full"} onClick={logoutHandler}>Log-Out</Button>
          <VStack w={"full" }  h={"full" } overflowY={'auto'} padding={3} css={{'&::-webkit-scrollbar':{
            display:'none'
          }}} >
            {
              messages.map((item)=>(
                <Message key={item.id} text={item.text} url={item.url}  user={item.uid === user.uid?"me":"other"} />
              ))
            }
            <div ref={divForScroll}></div>
            </VStack>
            
            <form onSubmit={submitHandler}>
             <HStack>
             <Input placeholder="enter a text" value={message} onChange={(e)=>{
              setMessage(e.target.value)
             }}></Input>
              <Button bg={"purple.400"} type="submit">Submit</Button>
             </HStack>
            </form>
            </VStack>
           
            
        </Container>: <VStack justifyContent={'center'} h={'100vh'}>
          <Button colorScheme="purple" onClick={logInHandler}>Sign In With Google</Button>
        </VStack>
        }
      </Box>
    </div>
  );
}

export default App;
