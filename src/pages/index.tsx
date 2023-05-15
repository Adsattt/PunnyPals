import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import PageContent from '../components/Layout/PageContent';
import CreatePostLink from '../components/Layout/CreatePostLink';
import Posts from '../components/Post/Posts';
import Category from '../components/Categories/Category';
import About from '../components/AboutUs/About_us';
import { Box, Stack } from '@chakra-ui/react';

const Home: NextPage = () => {
  return( 
  <>
    <PageContent>
        <>
        <CreatePostLink/>
        <Posts/>
        </>
        <>
        <Stack>
          <Box>
            <Category/>
          </Box>
        <About/>
        </Stack>
        </>
    </PageContent>
    </>
  )
};

export default Home;

