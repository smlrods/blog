import { Container, Typography, Card, CardContent, CardMedia, Divider, TextField, Button, Skeleton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';

// Styled components
const CardWrapper = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
});

const CardMediaWrapper = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
});

const CardContentWrapper = styled(CardContent)({
  flexGrow: 1,
});

const CommentCardWrapper = styled(Card)({
  marginBottom: '16px',
});

const CommentCardContent = styled(CardContent)({
  paddingBottom: '8px',
});

const CommentFormWrapper = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '32px',
  marginBottom: '32px',
});

interface CommentType {
  _id?: string;
  email: string;
  name: string;
  comment: string;
  timestamp?: string;
  post?: string
}

import { PostType } from './Posts';
import { useParams } from 'react-router-dom';

// Individual blog post component
const Post = () => {
  // post data
  const [postData, setPostData] = useState<PostType>();
  const { postid } = useParams();

  // State for comment form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  // comments data
  const [comments, setComments] = useState<CommentType[]>(Array(3).fill(null));

  const getPost = async () => {
    const response = await fetch(`https://blog-api-production-c132.up.railway.app/post/${postid}`);
    const post: PostType = await response.json();
    setPostData(post);
  }

  const getComments = async () => {
    const response = await fetch(`https://blog-api-production-c132.up.railway.app/post/${postid}/comments`);
    const newComments: CommentType[] = await response.json();
    setComments(newComments);
  }

  useEffect(() => { 
    getPost();
    getComments();
  }, []);

  // Function to handle comment form submission
  const handleCommentSubmit = async (event: any) => {
    event.preventDefault();

    const newComment = {
      name,
      email,
      comment: body,
    };

    const response = await fetch(
      `https://blog-api-production-c132.up.railway.app/post/${postid}/comments`, 
      { 
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
      }
    );
    // Reset form fields
    setName('');
    setEmail('');
    setBody('');

    getComments();
  };

  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
      {/* Blog post card */}
      <CardWrapper>
        <CardMediaWrapper
          image="https://i0.wp.com/metagalaxia.com.br/wp-content/uploads/2018/04/personagens-de-Steins-Gate-01.jpg?resize=1600%2C1000&ssl=1"
          title="Blog Title"
        />
        <CardContentWrapper>
          <Typography gutterBottom variant="h5" component="h2">
            {postData ? postData.title : <Skeleton width={300} />}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {postData ? postData.timestamp : <Skeleton width={200}/>}
            January 1, 2022
          </Typography>
          <Typography variant="body1">
            {postData ? postData.content : <Skeleton />}
          </Typography>
        </CardContentWrapper>
      </CardWrapper>

      {/* Comments section */}
      <Container maxWidth="md" sx={{ pt: 4 }}>
        <Typography gutterBottom variant="h5" component="h2">
          Comments
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {/* Map through comments and display each one */}
        {comments.map((comment: CommentType) => {
          if (comment) {
            return (
              <CommentCardWrapper key={comment._id}>
                <CommentCardContent>
                  <Typography variant="subtitle1" component="h4">
                    {decode(comment.name)}
                  </Typography>
                  <Typography variant="subtitle2" component="h5" color="textSecondary" gutterBottom>
                    {comment.email}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {decode(comment.comment)}
                  </Typography>
                </CommentCardContent>
              </CommentCardWrapper>
            );
          }

          return (
            <CommentCardWrapper key={uuidv4()}>
              <Skeleton 
                key={uuidv4()}
                variant='rectangular'
                height={100}
              />
            </CommentCardWrapper>
          );
        })}
        <CommentFormWrapper>
          <Typography variant="h6" component="h3" gutterBottom>
            Leave a Comment
          </Typography>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Comment"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </CommentFormWrapper>
      </Container>
    </Container>
  );
};

export default Post;
