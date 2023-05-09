import { Container, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CardWrapper = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const CardMediaWrapper = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
});

const CardContentWrapper = styled(CardContent)({
  flexGrow: 1,
});

export interface PostType {
  title: string,
  content: string,
  timestamp: string,
  published: boolean,
  author: string,
  _id: string
} 

const Posts = () => {
  const [posts, setPosts] = useState<PostType[] | null[]>(Array(6).fill(null));

  const getPosts = async () => {
    const response = await fetch("https://blog-api-production-c132.up.railway.app/post");
    const posts: PostType[] = await response.json();
    setPosts(posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
      <Grid container spacing={4}>
        {posts.map((post: any): any => {
          if (post) {
            return <CardPost key={uuidv4()} post={post} />
          }
          return (
            <Grid key={uuidv4()} item xs={12} md={4}>
              <Skeleton key={1} variant='rectangular' height={250}/>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
};

const CardPost = ({ post }: { post: PostType }) => {
  return (
    <Grid item xs={12} md={4}>
      <CardWrapper>
        <CardActionArea component={Link} to={post._id} sx={{height: '100%'}}>
          <CardMediaWrapper
            image="https://i0.wp.com/metagalaxia.com.br/wp-content/uploads/2018/04/personagens-de-Steins-Gate-01.jpg?resize=1600%2C1000&ssl=1"
            title="Blog Title"
          />
          <CardContentWrapper>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography>
              {post.content.substring(0, 100) + `${post.content.length < 100 ? '' : '...'}`}
            </Typography>
          </CardContentWrapper>
        </CardActionArea>
      </CardWrapper>
    </Grid>
  );
}

export default Posts;
