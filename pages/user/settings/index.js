import { Box } from "@chakra-ui/react";
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ListItem from "../../../Components/ListItem";
import AuthContext from '../../../contexts/AuthContext';
import { db } from '../../../firebase/initFirebase';
import { ChevronRightIcon, MapIcon , } from '../../../icons/dist/cjs';
import FirstRowHeader from '../../../Components/FirstRowHeader';
import BackButton from '../../../Components/BackButton';

export const getServerSideProps = async (ctx) => {
    // const data = getOneDocument(ctx.query.id,`Bookings`)
    const docRef = doc(db, `Users`, ctx.query.uid);
    const docSnap = await getDoc(docRef);
   
    // if (!data) return { notFound: true };
    return { props: { data : JSON.stringify(docSnap.data()) || [] } };
  };

function UserMenu({data}) {
    const router = useRouter();
   const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user == null) {
         router.push("/login");
       }
     }, [user]);

    return (
        <>
        {user && <Box p={5} h={`100%`} w={`100%`}>





<Box display={[`box`,`box`,`box`,`none`,`none`]}>
    <FirstRowHeader title={`Settings`} leftIcon={<BackButton />} />
<ListItem click={() => router.push(`/user/resetPassword`)} leftIcon={<MapIcon color={`#000`} />} rightIcon={<ChevronRightIcon size={24} color={`#000000`} />}  title={`Reset Password`}  />


</Box>

<br/>
<br/>
<br/>
<br/>
   <br/>
                


</Box>}
        </>
    );
}

export default UserMenu

// export async function getServerSideProps(context) {



//     return { props :{posts :posts}}

// }