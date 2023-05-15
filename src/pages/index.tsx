import { Box, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import About from '../components/AboutUs/About_us';
import Category from '../components/Categories/Category';
import CreatePostLink from '../components/Layout/CreatePostLink';
import PageContent from '../components/Layout/PageContent';
import Posts from '../components/Post/Posts';

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

