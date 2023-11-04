import React from 'react'
import {HStack,Text , Avatar} from '@chakra-ui/react'
const msessag = ({text,url,user='other'}) => {
    console.log(text)
  return (
    <HStack alignSelf={user==='me'?'flex-end':'flex-start'} bg={'gray.100'} paddingY={2} paddingX={user==='me'?4:2} borderRadius={'base'}>
         {user==='other'&&<Avatar src={url}></Avatar>}
   <Text>{text}</Text>
   {user==='me'&&<Avatar src={url}></Avatar>}
  
    </HStack>
  )
}

export default msessag

