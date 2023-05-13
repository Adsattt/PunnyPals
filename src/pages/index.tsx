import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import PageContent from '../components/Layout/PageContent';
import CreatePostLink from '../components/Layout/CreatePostLink';

const Home: NextPage = () => {
  return( 
  <>
    <PageContent>
        <>
        <CreatePostLink/>
        </>
        <>
        <div>RHS</div>
        </>
    </PageContent>
    </>
  )
};

export default Home;

