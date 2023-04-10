import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';

const Navbar:React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <Flex bg="white" height='44px' padding='6px 12px'>
            <Flex align='center'>
                <Image src="/images/punnypalsFace.svg" height='30px' />
                <Image src="/images/punnypalsText.svg" height='20px' display={{ base: "none", md: "unset"}} ml='2'/>
            </Flex>
            {/* <Directory /> */}
            <SearchInput />
            <RightContent user={user}/>
        </Flex>
    )
}
export default Navbar;